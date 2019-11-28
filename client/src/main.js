import Vue from 'vue';
import VueCarousel from 'vue-carousel';
import VueSocketIO from 'vue-socket.io';
import App from './App.vue';
import router from './router';
import store from './store';
import './styles/main.scss';

Vue.config.productionTip = false;

Vue.use(VueCarousel);

Vue.use(new VueSocketIO({
    debug: true,
    connection: process.env.VUE_APP_API_URL,
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    },
}));

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
