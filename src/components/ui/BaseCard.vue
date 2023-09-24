<template>
    <div class="card">
        <slot></slot>
    </div>
</template>

<style scoped>
    .card {
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
        padding: 20px;
        margin: 0px auto 20px;
        max-width: 600px;
    }
</style>