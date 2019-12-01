<template>
    <main class="l-view l-view--animator">
        <div class="c-slide">
            <header class="c-slide__header">
                <div class="u-relative">
                    <h2 class="c-slide__title">Parcours</h2>
                    <h3 class="c-slide__subtitle">Parcours</h3>
                </div>
            </header>
            <div class="c-slide__content">
                <div class="switch-controls" @click="superControls = !superControls">
                    <span v-if="!superControls">Contrôle avancé</span>
                    <span v-else>Contrôle simple</span>
                </div>
                <div>
                    <div v-if="!superControls" class="controls-container">
                        <div class="controls__btn c-link--primary" @click="showModal = true">
                            <div class="content">
                                <div class="c-link__icon">
                                    <Arrow />
                                </div>
                                <span class="c-link__label">Lancer la séquence</span>
                            </div>
                        </div>
                        <div class="controls__btn c-link" @click="stopSequence">
                            <div class="content">
                                <div class="c-link__icon">
                                    <Stop />
                                </div>
                                <span class="c-link__label">Arrêt</span>
                            </div>
                        </div>
                        <div class="controls__btn c-link" @click="landing">
                            <div class="content">
                                <div class="c-link__icon--flip-180">
                                    <Arrow />
                                </div>
                                <span class="c-link__label">Atterir</span>
                            </div>
                        </div>
                        <div class="controls__btn c-link" @click="showGame = true">
                            <div class="content">
                                <span class="c-link__label">Fin de partie</span>
                            </div>
                        </div>
                    </div>

                    <div class="super-controls" v-else>
                        <SuperControls />
                    </div>

                </div>
            </div>
            <modal v-if="showModal" @close="showModal = false">
                <div slot="header">
                    <h2 class="c-slide__title">Sécurité</h2>
                    <h3 class="c-slide__subtitle">Sécurité</h3>
                </div>

                <div slot="body">
                    <p>Est ce que tout le monde est en dehors du parcours ?</p>
                </div>
                <div slot="footer">
                    <div class="c-link-container">
                        <div @click="startSequence" class="c-link--flat c-link--half">
                            <span>Oui</span>
                            <img src="@/assets/img/buttons/Bouton_03_Arreter.png" alt="">
                        </div>
                        <div @click="showModal = false" class="c-link--flat c-link--half">
                            <span>Non</span>
                            <img src="@/assets/img/buttons/Bouton_04_Pause.png" alt="">
                        </div>
                    </div>
                </div>
            </modal>
            <modal v-if="showGame" @close="showGame = false">
                <div slot="header">
                    <h2 class="c-slide__title">Fin de partie</h2>
                    <h3 class="c-slide__subtitle">Fin de partie</h3>
                </div>

                <div slot="body">
                    <p>Fin de partie</p>
                </div>
                <div slot="footer">
                    <div class="c-link-container">
                        <div @click="endGame(true)" class="c-link--flat c-link--half">
                            <span>Gagné</span>
                            <img src="@/assets/img/buttons/Bouton_03_Arreter.png" alt="">
                        </div>
                        <div @click="endGame(false)" class="c-link--flat c-link--half">
                            <span>Perdu</span>
                            <img src="@/assets/img/buttons/Bouton_04_Pause.png" alt="">
                        </div>
                    </div>
                </div>
            </modal>
        </div>
    </main>
</template>

<script>
    import Arrow from '@/assets/icons/ic_arrow.svg';
    import Stop from '@/assets/icons/ic_stop.svg';
    import Modal from "@/components/Modal";
    import SuperControls from "@/components/animator/SuperControls";
    import {routePath} from "../../router";

    export default {
        name: "DroneControls",
        components: {
            Modal,
            Arrow,
            Stop,
            SuperControls
        },
        data: () => ({
            showModal: false,
            showGame: false,
            superControls: false,
        }),
        methods: {
            startSequence() {
                this.showModal = false;
                this.$socket.emit('drone_start')
            },
            stopSequence() {
                this.$socket.emit('drone_stop')
            },
            landing() {
                this.$socket.emit('drone_backhome')
            },
            endGame(isWin) {
                this.showGame = false;
                this.$socket.emit("screenView", {path: routePath.SCREEN_FINAL, isWin})
            },
        },
        mounted() {
            this.$socket.emit("droneControls")
        }
    }
</script>

<style lang="scss" scoped>
    .controls-container {
        display: flex;
        justify-content: center;
    }
    
    .switch-controls {
        position: absolute;
        opacity: 0;
        top: 8px;
        right: 8px;
        padding: 16px 32px;
        color: $black;
        background-color: $white;
    }

    .controls__btn {
        user-select: none;

        &:active {
            background-color: #919191;
        }
    }
    .super-controls__up {
        display: flex;
        align-items: center;
    }
    .content {
        margin: auto;
    }
    .c-link__icon--flip-180 path {
        fill: #5B5B59;
    }
    .c-link--half {
        height: 130px;

        span {
            line-height: 140px;
            color: black !important;
        }
    }
</style>