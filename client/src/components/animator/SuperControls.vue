<template>
    <div>
        <div class="super-controls__up">
            <div class="super-controls__moves">
                <span class="move up" @click="moveTo('up')">
                    <Arrow/>
                </span>
                <div>
                    <span class="move left" @click="moveTo('left')">
                        <Arrow/>
                    </span>
                    <span class="move right" @click="moveTo('right')">
                        <Arrow/>
                    </span>
                </div>
                <span class="move down" @click="moveTo('down')">
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

<style scoped>
    .super-controls__moves {
        text-align: center;
        margin-right: 80px;
    }
    .move {
        padding: 20px;
    }

    .down svg {
        transform: rotate(180deg);
    }

    .left svg {
        margin-right: 50px;
        transform: rotate(-90deg);
    }

    .right svg {
        transform: rotate(90deg);
    }

    .super-controls__up {
        display: flex;
        align-items: center;
    }
</style>