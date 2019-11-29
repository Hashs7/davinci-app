<template>
    <main class="l-view l-view--animator">
        <div class="c-slide">
            <header class="c-slide__header">
                <div class="u-relative">
                    <h2 class="c-slide__title">Chronomètre</h2>
                    <h3 class="c-slide__subtitle">Chronomètre</h3>
                </div>
            </header>
            <div class="c-slide__content">
                <Timer controls />
                <router-link to="/animator/controls" class="c-link--flat">
                    <span>Partie terminée</span>
                    <img src="@/assets/img/buttons/Bouton_05_Partie_Terminée.png" alt="">
                </router-link>

            </div>
        </div>
    </main>
</template>

<script>
    import Timer from '@/components/Timer'

    export default {
        name: "Playing",
        components: {
            Timer,
        },
    }
</script>

<style scoped>
    .c-slide__content {
        width: 476px;
    }
    .c-link--primary {
        margin-top: 16px;
    }
</style>