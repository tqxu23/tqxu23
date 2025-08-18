<script setup lang="ts">
const { data: articlesNav } = await useAsyncData('articles-nav', () =>
	queryCollectionNavigation('articles')
)

const rootChildren = computed(() => {
	const list = (articlesNav.value as any[]) || []
	const root = list.find((i: any) => i?.path === '/articles') || list[0]
	return (root?.children as any[]) || []
})

interface ArticleDoc {
	path: string
	title?: string
	seo?: { description?: string, updatedAt?: string, image?: string }
}

const { data: articleDocs } = await useAsyncData('articles-docs', () =>
	queryCollection('articles').all()
)

const items = computed(() => {
	const docs = (articleDocs.value as ArticleDoc[]) || []
	const byPath = new Map(docs.map(d => [d.path, d]))
	const children = rootChildren.value as any[]
	return children.map(child => {
		const doc = byPath.get(child.path)
		return {
			path: child.path,
			title: doc?.title || child.title || child.path,
			description: doc?.seo?.description || '',
			updatedAt: doc?.seo?.updatedAt  || '',
			image: doc?.seo?.image || '',
		}
	})
})
console.log(items.value)

</script>

<template>
	<div v-if="items.length" class="grid grid-cols-1 gap-4">
		<NuxtLink
			v-for="item in items"
			:key="item.path"
			:to="item.path"
			class="block not-prose rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-3 md:py-4 hover:shadow-sm transition no-underline hover:no-underline"
		>
			<div class="flex items-start gap-3">
				<div class="flex-1 min-w-0">
					<div class="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-100">{{ item.title }}</div>
					<p v-if="item.description" class="mt-1 text-sm text-gray-600 dark:text-gray-300">{{ item.description }}</p>
					<div v-if="item.updatedAt" class="mt-2 text-xs text-gray-500 dark:text-gray-400">{{ item.updatedAt }}</div>
				</div>
				<div v-if="item.image" class="w-1/5 md:w-5/12 flex-shrink-0 self-start">
					<NuxtImg :src="item.image" alt="" class="block w-full h-auto object-contain rounded-md" />
				</div>
			</div>
		</NuxtLink>
	</div>
</template>