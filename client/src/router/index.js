import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/animator/start',
        name: 'AnimatorStart',
        component: () => import(/* webpackChunkName: "create" */ '../views/Animator/Start.vue')
    },
    {
        path: '/animator/playing',
        name: 'AnimatorPlaying',
        component: () => import(/* webpackChunkName: "create" */ '../views/Animator/Playing.vue')
    },
    {
        path: '/animator/controls',
        name: 'AnimatorControls',
        component: () => import(/* webpackChunkName: "create" */ '../views/Animator/DroneControls.vue')
    },
    {
        path: '/create',
        name: 'create',
        component: () => import(/* webpackChunkName: "create" */ '../views/Create.vue')
    },
    {
        path: '/play',
        name: 'play',
        component: () => import(/* webpackChunkName: "play" */ '../views/Game/Playing.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
