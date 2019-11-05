<template>
    <div class="settings">
        <div class="settings__prop">
            <label for="gridSize">Taille de la grille</label>
            <input id="gridSize" type="number" v-model="gridSize">
        </div>
        <div class="settings__prop">
            <button @click="edit('start')">Définir le départ</button>
        </div>
        <div class="settings__prop">
            <button @click="edit('end')">Définir l'arrivée</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Settings",
        computed: {
            gridSize: {
                get() {
                    return this.$store.state.matrixSize;
                },
                set(value) {
                    this.$store.commit('updateMatrixSize', value);
                }
            }
        },
        methods: {
            edit(prop) {
                this.$store.commit('editMode', prop);
            }
        }
    }
</script>

<style lang="scss" scoped>
.settings {
    position: absolute;
    top: 20px;
    left: 20px;
    padding: 10px;
    min-width: 160px;
    text-align: left;
    border: 1px solid gray;

    input {
        display: block;
    }
}

.settings__prop {
    margin-bottom: 16px;
}
</style>