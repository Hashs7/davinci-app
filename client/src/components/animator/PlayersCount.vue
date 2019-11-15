<template>
    <div class="c-slide players-count">
        <span class="players-count__btn" @click="updatePlayers(-1)">-</span>
        <span class="players-count__current">{{ playersCount }}</span>
        <span class="players-count__btn" @click="updatePlayers(1)">+</span>
    </div>
</template>

<script>
    export default {
        name: "Players",
        computed: {
            playersCount() {
                return this.$store.state.playersCount
            }
        },
        methods: {
            updatePlayers(value) {
                if (this.playersCount === 0 && value < 0) return;
                if (this.playersCount === 10 && value > 0) return;
                this.$store.state.playersCount += value;
            }
        }
    }
</script>

<style scoped>
    .players-count {
        font-size: 180px;
        display: flex;
        justify-content: center;
    }
    .players-count__btn {
        width: 120px;
        display: block;
        cursor: pointer;
        text-align: center;
    }
    .players-count__current {
        display: inline-block;
        width: 240px;
        margin: 0 58px;
        text-align: center;
    }
</style>