<template>
    <div class="timer">
        <div class="timer__values">
            <span class="number">{{ minutes }}</span>
            <span class="number">:</span>
            <span class="number">{{ seconds }}</span>
        </div>
        <div v-if="controls" class="timer__controls">
            <span v-if="!isStarted" @click="timerStart">Démarrer</span>
            <div v-else>
                <span v-if="isPaused" @click="timerPlay">Reprendre</span>
                <span v-else @click="timerPause">Pause</span>
                <span @click="timerReset">Réinitialiser</span>
            </div>
        </div>
        <div class="status-tag" :class="statusType">{{ statusText }}</div>
    </div>
</template>

<script>
    import {routePath} from "../router";

    export default {
        name: "Timer",
        props: {
            controls: {
                type: Boolean,
                default: false
            },
            startTime: {
                type: Date,
                required: false,
            },
            endTime: {
                type: Date,
                required: false,
            }
        },
        data: () => ({
            timer: "",
            start: "",
            end: "",
            interval: null,
            minutes: "5",
            seconds: "00",
            statusType: "",
            statusText: "",
            isStarted: false,
            isPaused: false,
        }),
        methods: {
            timerCount(start, end) {
                const now      = new Date().getTime();
                const distance = start - now;
                const passTime = end - now;

                if (distance < 0 && passTime < 0) {
                    this.statusType = "expired";
                    this.statusText = "Temps écoulé";
                    clearInterval(this.interval);
                } else if (distance < 0 && passTime > 0) {
                    this.calcTime(passTime);
                    this.statusType = "running";
                    this.statusText = "En cours";
                }
            },
            calcTime(dist) {
                this.minutes  = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((dist % (1000 * 60)) / 1000);
                this.seconds  = seconds > 9 ? seconds : '0' + seconds;
            },
            timerPause() {
                console.log("Paused");
                if (this.controls) {
                    this.$socket.emit("timerPause");
                }
                this.isPaused = true;
                clearInterval(this.interval);
            },
            timerStart() {
                console.log("Start");
                this.isStarted = true;
                if (!this.controls) {
                    console.log("startTime", this.startTime);
                    this.start = this.startTime;
                    this.end = this.endTime;
                }
                this.timerPlay();
            },
            timerPlay() {
                this.isPaused = false;
                this.start = new Date().getTime();
                this.end   = new Date(this.start + (this.minutes * 60000) + ((this.seconds + 1) * 1000)).getTime();

                if (this.controls) {
                    this.$socket.emit("timerStart", {startTime: this.start, endTime: this.end});
                }

                this.timerCount(this.start, this.end);
                this.interval = setInterval(() => {
                    this.timerCount(this.start, this.end);
                }, 1000);
            },
            timerReset() {
                console.log("Reset");

                if (this.controls) {
                    this.$socket.emit("timerReset");
                }
                this.isPaused = false;
                this.minutes  = 5;
                this.seconds  = "00";
                clearInterval(this.interval);
                this.timerPlay();
            }
        },
        mounted() {
            if (this.controls) {
                this.$socket.emit("screenView", {path: routePath.SCREEN_PLAY})
            }
        }
    }
</script>

<style scoped>
    .timer__values {
        font-size: 200px;
    }
</style>