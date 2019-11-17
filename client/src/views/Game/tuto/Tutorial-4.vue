<template>
    <p>Mais faites attention aux obstacles.</p>
</template>

<script>
    export default {
        name: "Tutorial-4",
        sockets: {
            screenView: function (data) {
                this.$router.push(data);
            }
        },
    }
</script>

<style scoped>

</style>