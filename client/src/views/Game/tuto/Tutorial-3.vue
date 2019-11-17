<template>
    <p>Ouvrez bien les yeux pour découvrir la signification des symboles.</p>
</template>

<script>
    export default {
        name: "Tutorial-3",
        sockets: {
            screenView: function (data) {
                this.$router.push(data);
            }
        },
    }
</script>

<style scoped>

</style>