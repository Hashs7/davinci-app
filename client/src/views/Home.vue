<template>
  <div class="home">
      <Settings />
      <GridContainer />
  </div>
</template>

<script>
import GridContainer from '@/components/grid/GridContainer'
import Settings from '@/components/Settings'

export default {
  name: 'home',
  components: {
      Settings,
      GridContainer
  }
}
</script>
