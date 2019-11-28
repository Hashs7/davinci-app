<template>
    <main class="l-view l-view--screen">
        <div class="c-slide">
            <div class="c-slide__content">
                <div class="players-container">
                    <Player v-for="(el, i) in players" :key="i" :name="el.name" :img="el.img" :imgNB="el.imgNB"  :index="i" />
                </div>
            </div>
        </div>
    </main>
</template>

<script>
    import Player from '@/components/screen/Player';
    import SM from "@/assets/img/Salvator_Mundi_Couleurs.png";
    import DH from "@/assets/img/La_Dame_Hermine_Couleurs.png";
    import JC from "@/assets/img/La_Joconde_Couleurs.png";
    import JB from "@/assets/img/Saint_Jean_Baptiste_Couleurs.png";
    import SM_NB from "@/assets/img/Salvator_Mundi_NB.png";
    import DH_NB from "@/assets/img/La_Dame_Hermine_NB.png";
    import JC_NB from "@/assets/img/La_Joconde_NB.png";
    import JB_NB from "@/assets/img/Saint_Jean_Baptiste_NB.png";

    export default {
        name: "Waiting",
        data() {
            return {
                players: [{
                    img: SM,
                    imgNB: SM_NB,
                    name: "Salvator Mundi"
                }, {
                    img: DH,
                    imgNB: DH_NB,
                    name: "La Dame Hermine"
                }, {
                    img: JC,
                    imgNB: JC_NB,
                    name: "La Joconde"
                }, {
                    img: JB,
                    imgNB: JB_NB,
                    name: "Saint Jean Baptiste"
                }]
            }
        },
        components: {
            Player
        },
        computed: {
            playersCount() {
                return this.$store.state.playersCount
            },
            activePlayer(value) {
                return this.playersCount < value
            }
        },
        sockets: {
            screenView: function (data) {
                this.$router.push(data);
            }
        },
    }
</script>

<style scoped>
    .players-container {
        display: flex;
        max-width: 1550px;
    }
</style>
