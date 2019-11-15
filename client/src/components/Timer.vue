<template>
    <div class="timer">
        <div class="timer__values">
            <span class="number">{{ minutes }}</span>
            <span class="number">:</span>
            <span class="number">{{ seconds }}</span>
        </div>
        <div v-if="controls" class="timer__controls">
            <span v-if="isPaused" @click="timerPlay">Reprendre</span>
            <span v-else @click="timerPause">Pause</span>
            <span>Réinitialiser</span>
        </div>
        <div class="status-tag" :class="statusType">{{ statusText }}</div>
    </div>
</template>

<script>
    export default {
        name: "Timer",
        props: {
            controls: {
                type: Boolean,
                default: false
            }
        },
        data: () => ({
            timer:"",
            start: "",
            end: "",
            interval: null,
            minutes:"",
            seconds:"",
            statusType:"",
            statusText: "",
            isPaused: false,
            startTime: new Date(),
            endTime: new Date(new Date().getTime() + (5 * 60000)),
        }),
        methods: {
            timerCount(start, end) {
                const now = new Date().getTime();
                const distance = start - now;
                const passTime =  end - now;

                if (distance < 0 && passTime < 0){
                    this.statusType = "expired";
                    this.statusText = "Temps écoulé";
                    clearInterval(this.interval);
                } else if (distance < 0 && passTime > 0){
                    this.calcTime(passTime);
                    this.statusType = "running";
                    this.statusText = "En cours";
                }
            },
            calcTime(dist) {
                this.minutes = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((dist % (1000 * 60)) / 1000);
                this.seconds = seconds > 9 ? seconds : '0' + seconds;
            },
            timerPause() {
                this.isPaused = true;
                clearInterval(this.interval);
            },
            timerPlay() {
                this.isPaused = false;
                this.startTime = new Date();
                this.endTime = new Date(new Date().getTime() + (this.minutes * 60000) + ((this.seconds +1) * 1000));
                this.start = new Date(this.startTime).getTime();
                this.end = new Date(this.endTime).getTime();
                this.timerCount(this.start, this.end);
                this.interval = setInterval(() => {
                    this.timerCount(this.start, this.end);
                }, 1000);
            }
        },
        mounted() {
            this.start = new Date(this.startTime).getTime();
            this.end = new Date(this.endTime).getTime();
            this.timerCount(this.start, this.end);
            this.interval = setInterval(() => {
                this.timerCount(this.start, this.end);
            }, 1000);
        },
    }
</script>

<style scoped>
.timer__values {
    font-size: 200px;
}
</style>