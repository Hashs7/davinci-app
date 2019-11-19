<template>
    <div class="timer">
        <div class="timer__values">
            <span class="number">{{ minutes }}</span>
            <span class="number">:</span>
            <span class="number">{{ seconds }}</span>
        </div>
<!--        <div class="status-tag" :class="statusType">{{ statusText }}</div>-->

        <div v-if="controls" class="timer__controls">
            <div v-if="!isStarted" @click="timerStart" class="c-link--flat">
                <span>Démarrer</span>
            </div>
            <div v-else class="c-link-container">
                <div v-if="isPaused" @click="timerPlay" class="c-link--flat c-link--half" >
                    <span>Reprendre</span>
                </div>
                <div v-else @click="timerPause" class="c-link--flat c-link--half">
                    <span>Pause</span>
                </div>
                <div @click="timerReset" class="c-link--flat c-link--outline c-link--half">
                    <span>Réinitialiser</span>
                </div>
            </div>
        </div>
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
            time: 0,
            elapsed: '0.0',
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
                // setTimeout(this.instance, 100);

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
            instance() {
                // Dead code
                this.time += 100;

                this.elapsed = Math.floor(this.time / 100) / 10;
                if(Math.round(this.elapsed) == this.elapsed) {
                    this.elapsed += '.0';
                }

                document.title = this.elapsed;

                const diff = (new Date().getTime() - this.start) - this.time;
                window.setTimeout(this.instance, (100 - diff));
            },
            timerReset() {
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
        },
        beforeDestroy() {
            clearInterval(this.interval);
        }
    }
</script>

<style scoped>
    .timer__values {
        font-family: 'Orelo Variable', sans-serif;
        font-size: 200px;
    }
</style>