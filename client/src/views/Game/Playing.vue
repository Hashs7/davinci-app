<template>
    <div class="v-play">
        <GridContainer/>
        <Timer ref="timer" :startTime="startTime" :endTime="endTime"/>
    </div>
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
                // console.log("start", data);
                this.startTime = new Date(data.startTime);
                this.endTime   = new Date(data.endTime);
                console.log("startTime", this.startTime);
                this.$refs.timer.timerStart();
            },
            timerPause: function () {
                console.log("timerPause");
                this.$refs.timer.timerPause();
            },
            timerReset: function () {
                console.log("timerReset");
                this.$refs.timer.timerReset();
            },
        },
    }
</script>
