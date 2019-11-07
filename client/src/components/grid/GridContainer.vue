<template>
    <div class="grid-container" :style="cssVars">
        <GridItem v-for="(item, i) in flatMatrix" :key="i" :value="i" :position="{x: item.x, y: item.y}" :walkable="item.walkable" />
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
            matrix: null,
        }
    },
    computed: {
        cssVars() {
            return {
                '--grid-size': this.$store.state.matrixSize,
            }
        },
        flatMatrix() {
            if(!this.$store.state.matrix) return [];
            return this.$store.state.matrix.nodes.flat();
        }
    },
}
</script>

<style scoped>
.grid-container {
    display: inline-grid;
    margin: 0 auto;
    grid-template-columns: repeat(var(--grid-size), 80px);
}
</style>