<template>
    <p>Venez à bout du labyrinthe de Léonard de Vinci.</p>
</template>

<script>
    export default {
        name: "Tutorial-1",
        sockets: {
            screenView: function (data) {
                this.$router.push(data);
            }
        },
    }
</script>

<style scoped>

</style>