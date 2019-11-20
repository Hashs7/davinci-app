<template>
    <main class="l-view l-view--animator">
        <div class="c-slide">
            <div class="c-slide__content">
                <div class="play-container">
                    <GridContainer />
                    <div class="timer-container" v-if="!droneStarted">
                        <Hourglass />
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

    export default {
        name: 'play',
        components: {
            GridContainer,
            Timer,
            Hourglass,
        },
        data: () => ({
            startTime: null,
            endTime: null,
            droneStarted: false
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
        },
    }
</script>

<style lang="scss" scoped>
    .play-container {
        width: 1270px;
        display: flex;
        justify-content: center;
        margin: auto;
    }
    .timer-container {
        margin-left: 200px;
    }
</style>
