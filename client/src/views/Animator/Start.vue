<template>
    <main class="l-view">
        <header class="l-header">
            <h1>{{ title }}</h1>
        </header>
        <div class="l-page">
            <div class="l-page__content">

                <carousel :per-page="1" @page-change="pageChange" :navigationEnabled="true">
                    <slide>
                        <PlayersCount />
                    </slide>
                    <slide>
                        <Scenario />
                    </slide>
                    <slide>
                        <Tutorial />
                    </slide>
                    <slide>
                        <Tutorial />
                    </slide>
                    <slide>
                        <Tutorial />
                    </slide>
                    <slide>
                        <Tutorial />
                    </slide>
                    <slide>
                        <Tutorial />
                    </slide>
                </carousel>

            </div>
        </div>
    </main>
</template>

<script>
    import PlayersCount from '@/components/animator/PlayersCount';
    import Scenario from '@/components/animator/Scenario';
    import Tutorial from '@/components/animator/Tutorial';
    import {routePath} from "../../router";

    export default {
        name: "Start",
        components: {
            PlayersCount,
            Scenario,
            Tutorial,
        },
        data: () => ({
            title: "Joueurs"
        }),
        methods: {
            pageChange(index) {
                if(index === 0) {
                    this.title = "Joueurs"
                } else if (index === 1) {
                    this.title = "Scénario"
                } else {
                    this.title = "Tutoriel";
                    this.$socket.emit("screenView", { path: routePath.SCREEN_TUTO + (index - 1) })
                }
            }
        }
    }
</script>

<style>
    .VueCarousel-navigation-next, .VueCarousel-navigation-prev {
        transform: translateY(-50%) !important;
    }
    .VueCarousel-navigation--disabled {
        opacity: 0 !important;
    }
    .VueCarousel-slide {
        display: flex;
    }
</style>