<template>
    <div class="grid-container">
        <GridItem v-for="(item, i) in size*size" :key="i" :value="i" :style="cssVars"/>
    </div>
</template>

<script>
import GridItem from '@/components/grid/GridItem'
export default {
    name: "GridContainer",
    components: {
        GridItem
    },
    data() {
        return {
            size: 8
        }
    },
    computed: {
        cssVars() {
            return {
                '--grid-size': this.size,
            }
        }
    }
}
</script>

<style scoped>
.grid-container {
    display: inline-grid;
    margin: 0 auto;
    grid-template-columns: repeat(8, 40px);
}
</style>