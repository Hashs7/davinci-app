<template>
    <p>Déplacez-vous à l’aide des symboles.</p>
</template>

<script>
    export default {
        name: "Tutorial-2",
        sockets: {
            screenView: function (data) {
                this.$router.push(data);
            }
        },
    }
</script>

<style scoped>

</style>