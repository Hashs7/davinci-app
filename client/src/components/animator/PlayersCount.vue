<template>
    <div class="players-count">
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
                this.$store.state.playersCount += value;
            }
        }
    }
</script>

<style scoped>
    .players-count {
        font-size: 180px;
    }
    .players-count__btn {
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