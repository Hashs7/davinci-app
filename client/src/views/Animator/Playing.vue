<template>
    <main class="l-view">
        <header class="l-header">
            <h1>Chronomètre</h1>
        </header>
        <div class="l-page">
            <div class="l-page__content">
                <Timer :startTime="startDate" :endTime="endDate"/>
                <div>
                    <span>Arrêter</span>
                    <span>Pause</span>
                </div>
                <router-link to="/animator/controls" class="link">Partie terminée</router-link>
            </div>
        </div>
    </main>
</template>

<script>
    import Timer from '@/components/Timer'

    export default {
        name: "Playing",
        components: {
            Timer,
        },
        computed: {
            startDate() {
                // Add 5 minutes
                return new Date();
            },
            endDate() {
                // Add 5 minutes
                return new Date(new Date().getTime() + (5 * 60000));
            }
        }
    }
</script>

<style scoped>

</style>