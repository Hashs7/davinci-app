import Vue from 'vue'
import Vuex from 'vuex'
import {createMatrix, getPath, setItem} from "../utils/API";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      matrixSize: null,
      matrixRowSize:1,
      matrixColumnSize:1,
      matrix: null,
      resolve: [],
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
      playersCount: 0
  },
  mutations: {
      
      updateMatrixRowSize(state,value){
        state.matrixRowSize = value;
          createMatrix(value, state.matrixColumnSize)
              .then(({ data }) => {
                  state.matrix = data.matrix
              });
      },

      updateMatrixColumnSize(state,value){
          state.matrixColumnSize = value;
          createMatrix(state.matrixRowSize, value)
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
      },
      
      drawPath(state, path) {
          this.state.resolve = path;
      }
  },
  actions: {
      async findPath({ commit }) {
          const { data } = await getPath();
          commit('drawPath', data.path);
      }
  },
  modules: {
  }
})
