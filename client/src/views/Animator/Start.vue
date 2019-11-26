<template>
    <main class="l-view l-view--animator">
        <div class="l-page">
            <div class="l-page__content">
                <carousel :per-page="1" @page-change="pageChange" :navigationEnabled="true" :minSwipeDistance="600">
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
        },
        data: () => ({
            title: "Joueurs",
            animator: TUTO.animator
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

<style lang="scss">
    .l-page__content {
        width: 100%;
    }
</style>