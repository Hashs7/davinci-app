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
                <div class="controls-container">
<!--                    <div class="controls__btn c-link&#45;&#45;primary" @click="showModal = true">
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
                    <div class="controls__btn c-link" @click="goStartSequence">
                        <div class="content">
                            <div class="c-link__icon&#45;&#45;flip-180">
                                <Arrow />
                            </div>
                            <span class="c-link__label">Revenir au départ</span>
                        </div>
                    </div>-->
                    <div class="controls__btn c-link" @click="sendSymbol('White')">
                        <div class="content">
                            <span class="c-link__label">send white</span>
                        </div>
                    </div>
                    <div class="controls__btn c-link" @click="sendSymbol('Blue')">
                        <div class="content">
                            <span class="c-link__label">send Blue</span>
                        </div>
                    </div>
                    <div class="controls__btn c-link" @click="sendSymbol('Yellow')">
                        <div class="content">
                            <span class="c-link__label">send Yellow</span>
                        </div>
                    </div>
                    <div class="controls__btn c-link" @click="sendSymbol('Red')">
                        <div class="content">
                            <span class="c-link__label">send Red</span>
                        </div>
                    </div>
                    <div class="controls__btn c-link" @click="sendSymbol('Green')">
                        <div class="content">
                            <span class="c-link__label">send Green</span>
                        </div>
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
                        </div>
                        <div @click="showModal = false" class="c-link--flat c-link--half">
                            <span>Non</span>
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

    export default {
        name: "DroneControls",
        components: {
            Modal,
            Arrow,
            Stop,
        },
        data: () => ({
            showModal: false,
        }),
        methods: {
            startSequence() {
                this.showModal = false;
                this.$socket.emit('drone_start')
            },
            stopSequence() {
                this.$socket.emit('drone_stop')
            },
            goStartSequence() {
                this.$socket.emit('drone_backhome')
            },
            sendSymbol(value) {
                this.$socket.emit('pushSymbol', value)
            }
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

    .controls__btn {
        user-select: none;

        &:active {
            background-color: #919191;
        }
    }

    .content {
        margin: auto;
    }
    .c-link__icon--flip-180 path {
        fill: #5B5B59;
    }
</style>