<template>
    <div class="grid-item" :class="[type]" @click="setItem">
        <span v-if="debug" class="value">{{ position.x }}, {{ position.y }}</span>
    </div>
</template>

<script>
export default {
    name: "GridItem",
    props: ['value', 'position', 'walkable', 'debug'],
    computed: {
        type() {
            const { start, end, resolve } = this.$store.state;
            if(!this.walkable) return 'disable';
            if(this.position.x === start.x && this.position.y === start.y) return 'start';
            if(this.position.x === end.x && this.position.y === end.y) return 'end';
            if(resolve.length) {
                return resolve.filter(item => this.position.x === item[0] && this.position.y === item[1]).length
                ? 'path' : '';
            }
            return '';
        }
    },
    methods: {
        setItem() {
            if(!this.debug) return;
            this.$store.commit('setItemValue', this.position)
        }
    }
}
</script>

<style lang="scss" scoped>
.grid-item {
    display: flex;
    width: 55px;
    height: 55px;
    border: 2px solid $white;
    box-sizing: border-box;
    cursor: pointer;
    user-select: none;

    &.start {
        background-color: green;
    }
    &.end {
        background-color: red;
    }
    &.path {
        background-color: orange;
    }
    &.disable {
        background: repeating-linear-gradient(
            -45deg,
            $white,
            $white 4px,
            $white 4px,
            black 4px,
            black 8px
        );
    }
}
.value {
    margin: auto;
}
</style>