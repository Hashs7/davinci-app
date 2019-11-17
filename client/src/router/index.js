import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

export const routePath = {
    HOME: '/',
    ANIMATOR_START: '/animator/start',
    ANIMATOR_PLAYING: '/animator/playing',
    ANIMATOR_CONTROLS: '/animator/controls',
    SCREEN_WAITING: '/screen/waiting',
    SCREEN_TUTO: '/screen/tuto-',
    SCREEN_TUTO_1: '/screen/tuto-1',
    SCREEN_TUTO_2: '/screen/tuto-2',
    SCREEN_TUTO_3: '/screen/tuto-3',
    SCREEN_TUTO_4: '/screen/tuto-4',
    SCREEN_TUTO_5: '/screen/tuto-5',
    SCREEN_PLAY: '/screen/play',
    SCREEN_FINAL: '/screen/final',
    CREATE: '/create'
};

const routes = [
    {
        path: routePath.HOME,
        name: 'home',
        component: Home
    },
    {
        path: routePath.ANIMATOR_START,
        name: 'AnimatorStart',
        component: () => import(/* webpackChunkName: "AnimatorStart" */ '../views/Animator/Start.vue')
    },
    {
        path: routePath.ANIMATOR_PLAYING,
        name: 'AnimatorPlaying',
        component: () => import(/* webpackChunkName: "AnimatorPlaying" */ '../views/Animator/Playing.vue')
    },
    {
        path: routePath.ANIMATOR_CONTROLS,
        name: 'AnimatorControls',
        component: () => import(/* webpackChunkName: "AnimatorControls" */ '../views/Animator/DroneControls.vue')
    },
    {
        path: routePath.SCREEN_WAITING,
        name: 'ScreenWaiting',
        component: () => import(/* webpackChunkName: "ScreenWaiting" */ '../views/Game/Waiting')
    },
    {
        path: routePath.SCREEN_TUTO_1,
        name: 'ScreenTutorial-1',
        component: () => import(/* webpackChunkName: "ScreenTutorial-1" */ '../views/Game/tuto/Tutorial-1')
    },
    {
        path: routePath.SCREEN_TUTO_2,
        name: 'ScreenTutorial-2',
        component: () => import(/* webpackChunkName: "ScreenTutorial-2" */ '../views/Game/tuto/Tutorial-2')
    },
    {
        path: routePath.SCREEN_TUTO_3,
        name: 'ScreenTutorial-3',
        component: () => import(/* webpackChunkName: "ScreenTutorial-3" */ '../views/Game/tuto/Tutorial-3')
    },
    {
        path: routePath.SCREEN_TUTO_4,
        name: 'ScreenTutorial-4',
        component: () => import(/* webpackChunkName: "ScreenTutorial-4" */ '../views/Game/tuto/Tutorial-4')
    },
    {
        path: routePath.SCREEN_TUTO_5,
        name: 'ScreenTutorial-5',
        component: () => import(/* webpackChunkName: "ScreenTutorial-5" */ '../views/Game/tuto/Tutorial-5')
    },
    {
        path: routePath.SCREEN_PLAY,
        name: 'ScreenPlay',
        component: () => import(/* webpackChunkName: "ScreenPlay" */ '../views/Game/Playing.vue')
    },
    {
        path: routePath.SCREEN_FINAL,
        name: 'ScreenFinal',
        component: () => import(/* webpackChunkName: "ScreenFinal" */ '../views/Game/Final.vue')
    },
    {
        path: routePath.CREATE,
        name: 'Create',
        component: () => import(/* webpackChunkName: "Create" */ '../views/Create.vue')
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
