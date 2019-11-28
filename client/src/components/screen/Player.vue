<template>
    <div class="player" :class="{active: isActive }">
        <img :src="img" alt="" class="player__img">
        <img :src="imgNB" alt="" class="player__img-nb">
        <p class="player__name">{{ name }}</p>
    </div>
</template>

<script>
    export default {
        name: "Player",
        props: {
            name: {
                type: String,
                required: true,
            },
            img: {
                type: String,
                required: true,
            },
            imgNB: {
                type: String,
                required: true,
            },
            index: {
                type: Number,
                required: true,
            },
        },
        computed: {
            isActive() {
                return this.$store.state.playersCount > this.index;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .player {
        margin: 0 90px;
        position: relative;
        height: 300px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .player__img {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            margin: auto;
        }
        .player__name {
            margin-bottom: 0;
            opacity: .3;
            font-size: 28px;
            transition: opacity .4s ease-in-out;
        }

        .player__img {
            opacity: 0;
            transition: opacity .4s ease-in-out;
        }

        &.active {
            .player__name {
                opacity: 1;
            }
            .player__img {
                opacity: 1;
            }
        }
    }
</style>