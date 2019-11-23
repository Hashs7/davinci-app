<template>
    <div>
        <video ref="video" autoplay loop controls src="@/assets/videos/TutoDroneObstacle.mp4"></video>
    </div>
</template>

<script>
    import TUTO from '@/const/TUTO';
    export default {
        name: "Tutorial-1",
        data: () => ({
            screen: TUTO.screen
        }),
        sockets: {
            screenView: function ({ path }) {
                if(path === this.$router.history.current.path) return;
                this.$router.push({ path });
            }
        },
        mounted() {
            setTimeout(() => this.$refs.video.play(), 1000)
        }
    }
</script>

<style scoped>

</style>