<template>
    <div class="grid-item">
        <span class="value">{{ value }}</span>
    </div>
</template>

<script>
export default {
    name: "GridItem",
    props: ['value'],
}
</script>

<style scoped>
.grid-item {
    display: flex;
    width: 40px;
    height: 40px;
    border: 2px solid black;
}
.value {
    margin: auto;
}
</style>