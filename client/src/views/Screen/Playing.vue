<template>
    <main class="l-view l-view--animator">
        <div class="c-slide">
            <div class="c-slide__content">
                <GridContainer />
                <Timer ref="timer" :startTime="startTime" :endTime="endTime"/>
            </div>
        </div>
    </main>
</template>

<script>
    import GridContainer from '@/components/grid/GridContainer'
    import Timer from '@/components/Timer'

    export default {
        name: 'play',
        components: {
            GridContainer,
            Timer,
        },
        data: () => ({
            startTime: null,
            endTime: null,
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
