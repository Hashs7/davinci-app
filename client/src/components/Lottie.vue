<template>
    <div :style="style" ref="lavContainer"></div>
</template>

<script>
    import lottie from 'lottie-web';

    export default {
        props: {
            options: {
                type: Object,
                required: true
            },
            height: Number,
            width: Number,
        },
        data() {
            return {
                style: {
                    width: this.width ? `${this.width}px` : '100%',
                    height: this.height ? `${this.height}px` : '100%',
                    overflow: 'hidden',
                    margin: '0 auto'
                }
            }
        },
        mounted() {
            this.anim = lottie.loadAnimation({
                container: this.$refs.lavContainer,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: this.options.animationData,
                rendererSettings: {
                    progressiveLoad: false,
                    preserveAspectRatio: 'xMinYMin slice',
                    hideOnTransparent: true,
                    viewBoxOnly: true,
                    focusable: false
                }
            }
        );
            //this.$emit('animCreated', this.anim)
        }
    }
</script>