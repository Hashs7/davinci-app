<template>
    <div>
        <div class="super-controls__up">
            <div class="super-controls__moves">
                <span class="move move__up" @click="moveTo('front')">
                    <Arrow/>
                </span>
                <div>
                    <span class="move move__left" @click="moveTo('left')">
                        <Arrow/>
                    </span>
                    <span class="move move__right" @click="moveTo('right')">
                        <Arrow/>
                    </span>
                </div>
                <span class="move move__down" @click="moveTo('back')">
                    <Arrow/>
                </span>
            </div>
            <div class="controls__btn c-link--small" @click="calibrate">
                <div class="content">
                    <span class="c-link__label">Calibrer orientation</span>
                </div>
            </div>
            <div class="controls__btn c-link--small" @click="detect">
                <div class="content">
                    <span class="c-link__label">Détecter le symbole</span>
                </div>
            </div>
        </div>

        <div class="controls__btn c-link--small" @click="sendSymbol('White')">
            <div class="content">
                <span class="c-link__label">Envoyer White</span>
            </div>
        </div>
        <div class="controls__btn c-link--small" @click="sendSymbol('Blue')">
            <div class="content">
                <span class="c-link__label">Envoyer Blue</span>
            </div>
        </div>
        <div class="controls__btn c-link--small" @click="sendSymbol('Yellow')">
            <div class="content">
                <span class="c-link__label">Envoyer Yellow</span>
            </div>
        </div>
        <div class="controls__btn c-link--small" @click="sendSymbol('Red')">
            <div class="content">
                <span class="c-link__label">Envoyer Red</span>
            </div>
        </div>
        <div class="controls__btn c-link--small" @click="sendSymbol('Green')">
            <div class="content">
                <span class="c-link__label">Envoyer Green</span>
            </div>
        </div>
    </div>
</template>

<script>
    import Arrow from '@/assets/icons/ic_arrow.svg';

    export default {
        name: "SuperControls",
        components: {
            Arrow,
        },
        methods: {
            sendSymbol(value) {
                this.$socket.emit('pushSymbol', value)
            },
            moveTo(value) {
                console.log("drone_moveTo");
                this.$socket.emit('drone_moveTo', [value])
            },
            detect() {
                this.$socket.emit('drone_detection')
            },
            calibrate() {
                this.$socket.emit('drone_calibrate')
            }
        }
    }
</script>

<style lang="scss">
    .super-controls__moves {
        text-align: center;
        margin-right: 80px;
    }
    .move {
        display: inline-block;
        box-sizing: content-box;
        background-color: white;
        padding: 20px;
        path {
            fill: black !important;
        }
    }
    .move__down {
        transform: rotate(180deg);
    }

    .move__left{
        margin-right: 60px;
        transform: rotate(-90deg);
    }

    .move__right {
        transform: rotate(90deg);
    }

    .super-controls__up {
        display: flex;
        align-items: center;
    }
</style>