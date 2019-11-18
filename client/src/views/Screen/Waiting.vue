<template>
    <div>
        <p>Logo</p>
    </div>
</template>

<script>
    export default {
        name: "Waiting",
        sockets: {
            screenView: function (data) {
                this.$router.push(data);
            }
        },
    }
</script>

<style scoped>

</style>