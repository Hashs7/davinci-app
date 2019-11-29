<template>
    <main class="l-view l-view--screen">
        <div class="c-slide">
            <div class="c-slide__content">
                <div class="play-container">
                    <GridContainer />
                    <div class="timer-container" v-if="!droneStarted">
<!--                        <Hourglass />-->
                        <lottie :options="defaultOptions"  :height="350" :width="400" />
                        <Timer ref="timer" :startTime="startTime" :endTime="endTime"/>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
    import GridContainer from '@/components/grid/GridContainer'
    import Timer from '@/components/Timer'
    import Hourglass from '@/components/Hourglass'
    import * as animationData from '@/assets/bodymovin/TutoDroneSablier2.json';
    import Lottie from '@/components/Lottie';

    export default {
        name: 'play',
        components: {
            GridContainer,
            Timer,
            Hourglass,
            Lottie,
        },
        data: () => ({
            startTime: null,
            endTime: null,
            droneStarted: false,
            animationData,
            defaultOptions: { animationData: animationData.default },
            animationSpeed: 1,
        }),
        sockets: {
            timerStart: function (data) {
                this.startTime = new Date(data.startTime);
                this.endTime   = new Date(data.endTime);
                this.$refs.timer.timerStart();
            },
            timerPause: function () {
                this.$refs.timer.timerPause();
            },
            timerReset: function () {
                this.$refs.timer.timerReset();
            },
            droneControls: function () {
                this.droneStarted = true;
            },
            screenView: function ({ path, isWin }) {
                if(path === this.$router.history.current.path) return;
                console.log("isWin", isWin);
                this.$store.state.isWin = isWin;
                this.$router.push({ path });
            }
        }
    }
</script>

<style lang="scss" >
    .play-container {
        width: 1270px;
        display: flex;
        justify-content: center;
        margin: auto;
    }
    .timer-container {
        width: 400px;
        margin-left: 100px;
        .timer__values {
            font-size: 150px;
        }
    }
</style>
