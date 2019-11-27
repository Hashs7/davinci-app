<template>
    <main class="l-view l-view--animator">
        <div class="l-page">
            <div class="l-page__content">
                <div class="navigation">
                    <div class="left" @click="goTo(-1)" v-if="currentSlide > 0">
                        <NavArrow />
                    </div>
                    <div class="right" @click="goTo(1)" v-if="currentSlide < 6">
                        <NavArrow />
                    </div>
                </div>
                <carousel :per-page="1" @page-change="pageChange" :navigateTo="currentSlide" :minSwipeDistance="400">
                    <slide>
                        <PlayersCount />
                    </slide>
                    <slide>
                        <Scenario />
                    </slide>
                    <slide>
                        <Tutorial :index="1" :txt="animator.first" />
                    </slide>
                    <slide>
                        <Tutorial :index="2" :txt="animator.second" />
                    </slide>
                    <slide>
                        <Tutorial :index="3" :txt="animator.third" />
                    </slide>
                    <slide>
                        <Tutorial :index="4" :txt="animator.fourth" />
                    </slide>
                    <slide>
                        <Tutorial :index="5" :txt="animator.fifth" />
                    </slide>
                </carousel>

            </div>
        </div>
    </main>
</template>

<script>
    import NavArrow from '@/assets/icons/ic_nav-arrow.svg';
    import PlayersCount from '@/components/animator/PlayersCount';
    import Scenario from '@/components/animator/Scenario';
    import Tutorial from '@/components/animator/Tutorial';
    import TUTO from '@/const/TUTO';
    import {routePath} from "../../router";

    console.log(TUTO);
    export default {
        name: "Start",
        components: {
            PlayersCount,
            Scenario,
            Tutorial,
            NavArrow,
        },
        data: () => ({
            title: "Joueurs",
            animator: TUTO.animator,
            currentSlide: 0,
        }),
        methods: {
            pageChange(index) {
                this.currentSlide = index;
                if(index === 0) {
                    this.title = "Joueurs"
                } else if (index === 1) {
                    this.title = "Scénario"
                } else {
                    this.title = "Tutoriel";
                    this.$socket.emit("screenView", { path: routePath.SCREEN_TUTO + (index - 1) })
                }
            },
            goTo(value) {
                if(value === 1 && this.currentSlide < 6) {
                    this.currentSlide += value;
                    return
                }
                if(value === -1 && this.currentSlide > 0) {
                    this.currentSlide += value;
                    return
                }
            }
        }
    }
</script>

<style lang="scss">
    .l-page__content {
        position: relative;
        width: 100%;
    }
    .left, .right {
        padding: 20px;
        z-index: 1000;
        position: absolute;
        top: 0;
        bottom: 0;
        height: 53px;
        margin: auto;
    }
    .left {
        left: 28px;
    }
    .right {
        right: 28px;
        transform: rotate(180deg);
    }
    .VueCarousel, .VueCarousel-slide, .VueCarousel-inner, .VueCarousel-wrapper {
        height: 100% !important;
    }
</style>