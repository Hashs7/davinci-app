<template>
    <div class="settings">
        <div class="settings__prop">
            <label for="rowSize">Nombre de ligne</label>
            <input id="rowSize" type="number" v-model="rowSize">
            <label for="columnSize">Nombre de colonnes</label>
            <input id="columnSize" type="number" v-model="columnSize">
        </div>
        <div class="settings__prop">
            <button @click="edit('start')">Définir le départ</button>
        </div>
        <div class="settings__prop">
            <button @click="edit('end')">Définir l'arrivée</button>
        </div>
        <div class="settings__prop">
            <button @click="findPath" :disabled="activeFind" >Trouver le chemin</button>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import {notNull} from "../utils/helpers";
    export default {
        name: "Settings",
        computed: {
            ...mapState([
                'start',
                'end'
            ]),
            rowSize: {
                get() {
                    return this.$store.state.matrixRowSize;
                },
                set(value) {
                    this.$store.commit('updateMatrixRowSize', value);
                }
            },

            columnSize:{
                get() {
                    return this.$store.state.matrixColumnSize;
                },
                set(value) {
                    this.$store.commit('updateMatrixColumnSize', value);
                }
            },


            activeFind() {
                return !(notNull(this.start.x) && notNull(this.start.y) && notNull(this.end.x) && notNull(this.end.y));
            }
        },
        methods: {
            edit(prop) {
                this.$store.commit('editMode', prop);
            },
            findPath() {
                this.$store.dispatch('findPath');
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