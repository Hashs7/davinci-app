<template>
    <div class="grid-container" :style="cssVars">
        <GridItem v-for="(item, i) in flatMatrix"
                  :key="i"
                  :value="i"
                  :debug="debug"
                  :position="{x: item.x, y: item.y}"
                  :walkable="item.walkable" />
    </div>
</template>

<script>
import GridItem from '@/components/grid/GridItem'

export default {
    name: "GridContainer",
    components: {
        GridItem
    },
    props: {
        debug: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            matrix: null,
        }
    },
    computed: {
        cssVars() {
            return {
                '--grid-row': this.$store.state.matrixRowSize,
                '--grid-column': this.$store.state.matrixColumnSize,
            }
        },
        flatMatrix() {
            if(!this.$store.state.matrix) return [];
            return this.$store.state.matrix.nodes.flat();
        }
    },
    mounted() {
        this.$store.dispatch('getCurrentMatrix');
    }
}
</script>

<style scoped>
.grid-container {
    display: inline-grid;
    grid-template-columns: repeat(var(--grid-column), 55px);
    grid-template-rows: repeat(var(--grid-row), 55px);
    grid-column-gap: 20px;
    grid-row-gap: 20px;
}
</style>