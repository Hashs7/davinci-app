<template>
    <div class="timer">
        <div class="timer__values">
            <span class="number">{{ minutes }}</span>
            <span class="number">:</span>
            <span class="number">{{ seconds }}</span>
        </div>
        <div v-if="controls" class="timer__controls"></div>
        <div class="status-tag" :class="statusType">{{ statusText }}</div>
    </div>
</template>

<script>
    export default {
        name: "Timer",
        props: ['startTime','endTime', 'controls'],
        data: () => ({
            timer:"",
            start: "",
            end: "",
            interval: "",
            minutes:"",
            seconds:"",
            statusType:"",
            statusText: "",
        }),
        mounted() {
            this.start = new Date(this.startTime).getTime();
            this.end = new Date(this.endTime).getTime();
            // Update the count down every 1 second
            this.timerCount(this.start,this.end);
            this.interval = setInterval(() => {
                this.timerCount(this.start,this.end);
            }, 1000);
        },
        methods: {
            timerCount(start,end) {
                const now = new Date().getTime();
                const distance = start - now;
                const passTime =  end - now;

                if(distance < 0 && passTime < 0){
                    this.statusType = "expired";
                    this.statusText = "Temps écoulé";
                    clearInterval(this.interval);
                } else if(distance < 0 && passTime > 0){
                    this.calcTime(passTime);
                    this.statusType = "running";
                    this.statusText = "En cours";
                }
            },
            calcTime(dist) {
                this.minutes = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((dist % (1000 * 60)) / 1000);
                this.seconds = seconds > 9 ? seconds : '0' + seconds;
            }
        }
    }
</script>

<style scoped>
.timer__values {
    font-size: 200px;
}
</style>