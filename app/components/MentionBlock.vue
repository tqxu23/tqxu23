<!-- This component is used to show Markdown code block examples -->
<template>
    <div class="bg-sky-50 dark:bg-sky-900/50 text-gray-900 dark:text-gray-100 rounded-lg shadow-md p-2 my-4 overflow-x-auto whitespace-pre-wrap">
        <slot mdc-unwrap="p" />
    </div>
</template>