<template>
    <div class="v-create">
        <Settings />
        <GridContainer debug />
    </div>
</template>

<script>
    import GridContainer from '@/components/grid/GridContainer'
    import Settings from '@/components/Settings'

    export default {
        name: 'create',
        components: {
            Settings,
            GridContainer,
        },
    }
</script>
