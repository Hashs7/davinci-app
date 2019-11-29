<template>
        <main class="l-view l-view--screen">
            <div class="l-page">
                <div class="c-slide">
                    <div class="c-slide__content">
                        <lottie :options="defaultOptions"  :height="500" :width="1000" />
                        <p class="c-slide__txt">{{ screen.first }}</p>
                    </div>
                </div>
            </div>
        </main>
</template>

<script>
    import TUTO from '@/const/TUTO';
    import * as animationData from '@/assets/bodymovin/TutoDroneLabyrinth2.json';
    import Lottie from '@/components/Lottie';

    export default {
        name: "Tutorial-1",
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
        methods: {
            handleAnimation: function (anim) {
                this.anim = anim;
            },

            stop: function () {
                this.anim.stop();
            },

            play: function () {
                this.anim.play();
            },

            pause: function () {
                this.anim.pause();
            },
        },
        mounted() {
            /*lottie.loadAnimation({
                container: this.$refs.container, // the dom element that will contain the animation
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: animationData,
                // path: './avion-enter.json' // the path to the animation json
            });*/
            console.log("data  ", animationData);
            // setTimeout(() => this.$refs.video.play(), 1000)
        }
    }
</script>

<style scoped>
.ccccc {
}
</style>