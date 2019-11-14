<template>
  <div class="v-play">
      <GridContainer />
      <Timer :startTime="startDate" :endTime="endDate"/>
  </div>
</template>

<script>
    import GridContainer from '@/components/grid/GridContainer'
    import Timer from '@/components/Timer'

    export default {
        name: 'play',
        components: {
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
