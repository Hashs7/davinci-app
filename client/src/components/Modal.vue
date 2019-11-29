<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <main class="l-view l-view--animator">
                    <div class="c-slide">
                        <span class="close-btn" @click="$emit('close')">Fermer</span>
                        <header class="c-slide__header">
                            <div class="u-relative">
                                <slot name="header"></slot>
                            </div>
                        </header>
                        <div class="c-slide__content">
                            <div class="modal-body">
                                <slot name="body">
                                    default body
                                </slot>
                            </div>

                            <div class="modal-footer">
                                <slot name="footer">
                                    default footer
                                    <button class="modal-default-button" @click="$emit('close')">
                                        OK
                                    </button>
                                </slot>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "Modal"
    }
</script>

<style scoped>
    .c-slide__content {
        max-width: 510px;
        margin: auto;
    }

    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }

    .modal-container {
        width: 300px;
        margin: 0px auto;
        padding: 20px 30px;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
    }

    .modal-header h3 {
        margin-top: 0;
        color: #42b983;
    }
    .close-btn {
        position: absolute;
        top: 16px;
        right: 16px;
    }
    .modal-body {
        margin: 20px 0;
        font-size: 46px;
    }

    .modal-default-button {
        float: right;
    }

    .modal-enter {
        opacity: 0;
    }

    .modal-leave-active {
        opacity: 0;
    }

    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
</style>