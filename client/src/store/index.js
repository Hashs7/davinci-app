import Vue from 'vue'
import Vuex from 'vuex'
import {createMatrix} from "../utils/API";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      matrixSize: null,
      matrix: null,
      start: {
          edit: false,
          x: null,
          y: null
      },
      end: {
          edit: false,
          x: null,
          y: null
      },
  },
  mutations: {
      updateMatrixSize(state, value) {
          state.matrixSize = value;
          createMatrix(value)
              .then(({ data }) => {
                  state.matrix = data.matrix
              });
      },
      editMode(state, property) {
          state.start.edit = false;
          state.end.edit = false;
          state[property].edit = true;
      },
      setItemValue(state, { x, y }) {
          if(state.start.edit) {
              state.start = { edit: false, x, y };
              return;
          }
          if(state.end.edit) {
              state.end = { edit: false, x, y };
              return;
          }
          // TODO send to server
          state.matrix.nodes[y][x].walkable = !state.matrix.nodes[y][x].walkable;
      }
  },
  actions: {
  },
  modules: {
  }
})
