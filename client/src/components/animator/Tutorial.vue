<template>
    <div class="c-slide">
        <button @click="changeView">change view</button>
        <router-link to="/animator/playing" class="link">Démarrer le jeu</router-link>
    </div>
</template>

<script>
    import { routePath } from "../../router";

    export default {
        name: "Tutorial",
        methods: {
            changeView() {
                console.log(this.$socket);
                this.$socket.emit("screenView", { path: routePath.SCREEN_TUTO_1 })
            }
        }
    }
</script>

<style scoped>

</style>