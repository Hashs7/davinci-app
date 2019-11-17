<template>
    <p>Veillez à revenir à temps pour l’exposition qui se tient au Louvre.</p>
</template>

<script>
    export default {
        name: "Tutorial-5",
        sockets: {
            screenView: function (data) {
                this.$router.push(data);
            }
        },
    }
</script>

<style scoped>

</style>