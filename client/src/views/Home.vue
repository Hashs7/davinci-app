<template>
    <main class="l-view l-view--animator">
        <div class="link-container">
            <router-link to="/animator/start" class="c-link">
                <span>Utiliser en tant qu'animateur</span>
            </router-link>
            <router-link to="/screen/waiting" class="c-link">
                <span>Utiliser en tant qu'écran</span>
            </router-link>
        </div>
    </main>
</template>

<script>
    export default {
        name: 'home',
    }
</script>

<style scoped lang="scss">
    .l-view {
        display: flex;
    }
    .link-container {
        margin: auto;
        display: inline-flex;
    }
</style>
