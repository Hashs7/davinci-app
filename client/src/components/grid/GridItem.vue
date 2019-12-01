<template>
    <div class="grid-item" :class="[type, walked]" @click="setItem">
        <span v-if="debug" class="value">{{ position.x }}, {{ position.y }}</span>
        <span class="grid-item__indicator" v-if="type === 'start' || type === 'start path'">D</span>
        <span class="grid-item__indicator" v-if="type === 'end'">A</span>
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
            if(this.position.x === start.x && this.position.y === start.y) {
                return resolve.length === 0 ? 'start' : 'start path'
            };
            if(this.position.x === end.x && this.position.y === end.y) return 'end';
            return '';
        },
        walked() {
            const { resolve } = this.$store.state;
            if(resolve.length) {
                return resolve.filter(item => this.position.x === item.x && this.position.y === item.y).length
                    ? 'path' : '';
            }
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
    transition: background-color .3s ease-in-out;

    &.start {
        //background-color: #5fbe84;
/*        &.path {
            color: black;
        }*/
    }
    &.end {
        //background-color: #b33434;
       /* &.path {
            color: black;
        }*/
    }
    &.path {
        background-color: $brown;
    }
    &.disable {
        background: repeating-linear-gradient(
            -45deg,
            white,
            white 4px,
            white 4px,
            black 4px,
            black 7px
        );
    }
}
.value, .grid-item__indicator {
    margin: auto;
}
.grid-item__indicator {
    font-size: 28px;
    line-height: 1;
    transform: translateY(3px);
}
</style>