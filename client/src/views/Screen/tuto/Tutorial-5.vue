<template>
    <div>
        <p>{{ screen.fifth }}</p>
    </div>
</template>

<script>
    import TUTO from '@/const/TUTO';
    export default {
        name: "Tutorial-5",
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