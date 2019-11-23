<template>
    <main class="l-view l-view--animator">
        <div class="c-slide">
            <div class="c-slide__content">
                <p>Logo</p>
            </div>
        </div>
    </main>
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