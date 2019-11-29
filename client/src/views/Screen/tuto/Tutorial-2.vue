<template>
    <main class="l-view l-view--screen">
        <div class="l-page">
            <div class="c-slide">
                <div class="c-slide__content">
                    <lottie :options="defaultOptions"  :height="670" :width="1000" />
                    <p class="c-slide__txt">{{ screen.second }}</p>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
    import * as animationData from '@/assets/bodymovin/TutoDroneFormes2.json';
    import Lottie from '@/components/Lottie';
    import TUTO from '@/const/TUTO';

    export default {
        name: "Tutorial-2",
        components: {
            Lottie,
        },
        data: () => ({
            screen: TUTO.screen,
            animationData,
            defaultOptions: { animationData: animationData.default },
            animationSpeed: 1,
        }),
        sockets: {
            screenView: function ({ path }) {
                if(path === this.$router.history.current.path) return;
                this.$router.push({ path });
            }
        },
    }
</script>

<style scoped>

</style>