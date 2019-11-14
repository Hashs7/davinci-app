<template>
    <main>
        <header>
            <h1>{{ title }}</h1>
        </header>
        <div>
            <carousel :per-page="1" @page-change="pageChange">
                <slide>
                    <PlayersCount />
                </slide>
                <slide>
                    <Scenario />
                </slide>
                <slide>
                    <Tutorial />
                </slide>
            </carousel>
        </div>
    </main>
</template>

<script>
    import PlayersCount from '@/components/animator/PlayersCount';
    import Scenario from '@/components/animator/Scenario';
    import Tutorial from '@/components/animator/Tutorial';

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
                console.log(index);
                if(index === 0) {
                    this.title = "Joueurs"
                } else if (index === 1) {
                    this.title = "Scénario"
                } else {
                    this.title = "Tutoriel"
                }
            }
        }
    }
</script>

<style scoped>

</style>