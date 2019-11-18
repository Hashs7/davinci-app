<template>
    <div class="c-slide">
        <header class="l-header">
            <h2>Tutoriel</h2>
            <h3 class="l-header__subtitle">Tutoriel</h3>
        </header>

        <h2 class="c-slide__index">{{ index }}</h2>
        <p class="c-slide__desc">{{ txt }}</p>

        <router-link v-if="index === 5" to="/animator/playing" class="link">Démarrer le jeu</router-link>
    </div>
</template>

<script>
    import { routePath } from "../../router";

    export default {
        name: "Tutorial",
        props: {
            index: {
                type: Number,
                required: true,
            },
            txt: {
                type: String,
                required: true,
            },
        },
        methods: {
            changeView() {
                console.log(this.$socket);
                this.$socket.emit("screenView", { path: routePath.SCREEN_TUTO_1 })
            }
        }
    }
</script>

<style scoped>
    .c-slide {
        position: relative;
        max-width: 600px;
    }

    .c-slide__index {
        font-size: 180px;
    }

    .c-slide__desc {
        text-align: left;
        font-size: 36px;
        color: #F5F1ED;
    }
</style>