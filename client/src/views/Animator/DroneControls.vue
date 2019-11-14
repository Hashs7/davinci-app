<template>
    <main class="l-view">
        <header class="l-header">
            <h1>Parcours</h1>
        </header>
        <div class="l-page">
            <div class="l-page__content">
                <div class="controls-container">
                    <div class="controls__btn" @click="showModal = true">
                        <div class="content">
                            <span>Lancer la séquence</span>
                        </div>
                    </div>
                    <div class="controls__btn">
                        <div class="content">
                            <span class="">Arrêt</span>
                        </div>
                    </div>
                    <div class="controls__btn">
                        <div class="content">
                            <span class="">Revenir au départ</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <modal v-if="showModal" @close="showModal = false">
            <h3 slot="header">Sécurité</h3>
            <div slot="body">
                <p>Est ce que tout le monde est en dehors du parcours ?</p>
            </div>
            <div slot="footer">
                <button @click="startSequence">Oui</button>
                <button @click="showModal = false">Non</button>
            </div>
        </modal>
    </main>
</template>

<script>
    import Modal from "@/components/Modal";

    export default {
        name: "DroneControls",
        components: {
            Modal
        },
        data: () => ({
            showModal: false,
        }),
        methods: {
            startSequence() {
               this.showModal = false;
            }
        }
    }
</script>

<style scoped>
    .controls-container {
        display: flex;
        justify-content: center;
    }
    .controls__btn {
        width: 176px;
        height: 176px;
        display: flex;
        margin: 0 85px;
        background-color: #D8D8D8;
    }
    .content {
        margin: auto;
    }
</style>