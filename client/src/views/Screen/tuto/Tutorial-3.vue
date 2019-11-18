<template>
    <div>
        <p>{{ screen.third }}</p>
    </div>
</template>

<script>
    import TUTO from '@/const/TUTO';
    export default {
        name: "Tutorial-3",
        data: () => ({
            screen: TUTO.screen
        }),
        sockets: {
            screenView: function ({ path }) {
                if(path === this.$router.history.current.path) return;
                this.$router.push({ path });
            }
        },
    }
</script>

<style scoped>

</style>