<template>
    <main>
        <header>
            <h1>Parcours</h1>
        </header>
        <div>
            <div class="controls-container">
                <div class="controls__btn">
                    <div class="content">
                        <span class="">Lancer la séquence</span>
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
    </main>
</template>

<script>
    export default {
        name: "DroneControls"
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