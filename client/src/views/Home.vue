<template>
    <div class="home">
        <div>
            <router-link to="/play" class="link">Jouer</router-link>
        </div>
        <div>
            <router-link to="/create" class="link">Créer un niveau</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'home',
    }
</script>

<style lang="scss">
.link {
    display: inline-block;
    height: 32px;
    line-height: 32px;
    padding: 0 16px;
    color: white;
    background-color: cornflowerblue;
    border-radius: 5px;
    margin-bottom: 16px;
    text-decoration: none;
}
</style>
