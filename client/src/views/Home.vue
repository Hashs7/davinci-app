<template>
    <div class="home">
        <Settings/>
        <GridContainer/>
        <Timer :startTime="startDate" :endTime="endDate"/>
    </div>
</template>

<script>
    import GridContainer from '@/components/grid/GridContainer'
    import Settings from '@/components/Settings'
    import Timer from '@/components/Timer'

    export default {
        name: 'home',
        components: {
            Settings,
            GridContainer,
            Timer,
        },
        computed: {
            startDate() {
                // Add 5 minutes
                return new Date();
            },
            endDate() {
                // Add 5 minutes
                return new Date(new Date().getTime() + (1 * 60000));
            }
        }
    }
</script>
