<template>
    <div class="c-slide">
        <header class="c-slide__header">
            <div class="u-relative">
                <h2 class="c-slide__title">Tutoriel</h2>
                <h3 class="c-slide__subtitle">Tutoriel</h3>
            </div>
        </header>
        <div class="c-slide__content">
            <h2 class="c-slide__index">{{ index }}</h2>
            <p class="c-slide__desc">{{ txt }}</p>

            <router-link v-if="index === 5" to="/animator/playing" class="c-link--flat">
                <span>Démarrer le jeu</span>
                <img src="@/assets/img/buttons/Bouton_05_Partie_Terminée.png" alt="">
            </router-link>
        </div>
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
    .c-slide__index {
        font-size: 180px;
    }
    .c-slide__content {
        max-width: 600px;
        margin: auto;
    }
    .c-slide__desc {
        text-align: center;
        font-size: 36px;
        color: #F5F1ED;
    }
</style>