import Vue from 'vue'
import Vuex from 'vuex'
import {createMatrix, setItem} from "../utils/API";

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
          let type = null;
          if(state.start.edit) {
              state.start = { edit: false, x, y };
              type = 'start';
          } else if (state.end.edit) {
              state.end = { edit: false, x, y };
              type = 'end';
          } else {
              // state.matrix.nodes[y][x].walkable = !state.matrix.nodes[y][x].walkable;
              type = 'block';
          }
          setItem(type, { x, y }).then(({ data }) => {
              state.matrix = data.matrix;
          })
      }
  },
  actions: {
  },
  modules: {
  }
})
