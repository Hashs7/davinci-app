<template>
    <div class="grid-item" :class="[type]" @click="setItem">
        <span class="value">{{ position.x }}, {{ position.y }}</span>
    </div>
</template>

<script>
export default {
    name: "GridItem",
    props: ['value', 'position', 'walkable'],
    computed: {
        type() {
            const { start, end } = this.$store.state;
            if(!this.walkable) return 'disable';
            if(this.position.x === start.x && this.position.y === start.y) return 'start';
            if(this.position.x === end.x && this.position.y === end.y) return 'end';
            return '';
        }
    },
    methods: {
        setItem() {
            this.$store.commit('setItemValue', this.position)
        }
    }
}
</script>

<style lang="scss" scoped>
.grid-item {
    display: flex;
    width: 80px;
    height: 80px;
    border: 2px solid black;
    box-sizing: border-box;

    &.start {
        background-color: green;
    }
    &.end {
        background-color: red;
    }
    &.disable {
        background-color: gray;
    }
}
.value {
    margin: auto;
}
</style>