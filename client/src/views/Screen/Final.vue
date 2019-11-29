<template>
    <main class="l-view l-view--screen">
        <div class="c-slide">
            <header class="c-slide__header">
                <div class="u-relative">
                    <div v-if="isWin">
                        <h2 class="c-slide__title">Gagné</h2>
                        <h3 class="c-slide__subtitle">Gagné</h3>
                    </div>
                    <div v-else>
                        <h2 class="c-slide__title">Perdu</h2>
                        <h3 class="c-slide__subtitle">Perdu</h3>
                    </div>
                </div>
            </header>
            <div class="c-slide__content">
                <div v-if="isWin" class="title-container">
                    <p class="title">Félicitations, vous avez gagnez</p>
                    <p class="desc">une place pour l’exposition de Léonard de Vinci au musée du Louvre.</p>
                    <div class="img-louvre">
                        <Louvre/>
                    </div>
                </div>
                <div v-else class="title-container--loose">
                    <p class="title">Vous avez détruit la machine</p>
                    <p class="desc">déguerpissez rapidement avant que les conservateurs vous attrapent.</p>
                    <div class="img-left">
                        <ArrowLeft/>
                    </div>
                    <div class="img-right">
                        <ArrowRight/>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
    import ArrowLeft from '@/assets/icons/ic_arrow-left.svg';
    import ArrowRight from '@/assets/icons/ic_arrow-right.svg';
    import Louvre from '@/assets/icons/ic_louvre.svg';

    export default {
        name: "Final",
        components: {
            ArrowLeft,
            ArrowRight,
            Louvre,
        },
        computed: {
            isWin() {
                console.log();
                return this.$store.state.isWin;
            }
        },
        sockets: {
            screenView: function ({ path }) {
                if(path === this.$router.history.current.path) return;
                this.$router.push({ path });
            }
        }
    }
</script>

<style scoped>
    .c-slide {
        overflow: hidden;
    }

    .title-container {
        max-width: 730px;
    }

    .title-container--loose {
        max-width: 690px;
    }

    .title {
        margin: 0;
        font-size: 60px;
        color: #8C7051;
    }

    .desc {
        margin: 0;
        font-size: 48px;
    }

    .img-louvre {
        position: absolute;
        bottom: -8px;
        left: 0;
        right: 0;
    }

    .img-left {
        position: absolute;
        bottom: 0;
        left: 88px;
        width: 510px;
    }

    .img-right {
        position: absolute;
        top: 65px;
        right: 0;
        width: 336px;
    }
</style>