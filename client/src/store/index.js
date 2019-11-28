import Vue from 'vue'
import Vuex from 'vuex'
import {createMatrix, getMatrix, getPath, setItem} from "../utils/API";

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
      SOCKET_updatePlayers(state, value) {
          state.playersCount = value;
      },

      SOCKET_updateDronePos(state, positions) {
          const newPosition = positions.slice(state.resolve.length - 1)
          console.log("postions", positions);
          newPosition.forEach((pos, i) => {
              setTimeout(() => {
                  state.resolve.push(pos)
              }, i * 1500)
          });
      },

      setMatrix(state, { matrix, start, end }) {
          console.log(matrix);
        state.matrix = matrix;
        state.start = start;
        state.end = end;
        state.matrixColumnSize = matrix.width;
        state.matrixRowSize = matrix.height;
      },
      
      updateMatrixRowSize(state, value){
        state.matrixRowSize = value;
          createMatrix(value, state.matrixColumnSize)
              .then(({ data }) => {
                  state.matrix = data.matrix
              });
      },

      updateMatrixColumnSize(state, value){
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
      },
      async getCurrentMatrix({ commit }) {
          const { data } = await getMatrix();
          console.log(data);
          commit('setMatrix', data);
      }
  },
  modules: {
  }
})
