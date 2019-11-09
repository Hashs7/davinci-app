<template>
    <div>
        <div>
            <span class="number">{{ minutes }}</span>
            <span class="number">:</span>
            <span class="number">{{ seconds }}</span>
        </div>
        <div class="status-tag" :class="statusType">{{ statusText }}</div>
    </div>
</template>

<script>
    export default {
        name: "Timer",
        props: ['startTime','endTime'] ,
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
            console.log(this.startTime);
            console.log(this.endTime);
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
                this.seconds = Math.floor((dist % (1000 * 60)) / 1000);
            }
        }
    }
</script>

<style scoped>

</style>