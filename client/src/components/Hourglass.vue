<template>
    <div class="hourglass">
        <div class="top"></div>
        <div class="bottom"></div>
    </div>
</template>

<script>
    export default {
        name: "Hourglass"
    }
</script>

<style lang="scss" scoped>
    $color: #EFECCA;
    $glass: rgba($color, 0.15);
    $full: 0%;
    $empty: 90%;
    $time: 6s;
    $size: 180px;

    body {
        background: #046380;
    }
    .hourglass {
        margin: 0 auto 30px auto;
        height: $size * 2;
        width: $size;
        animation: flip $time ease infinite;
    }
    .top, .bottom {
        background-color: $glass;
        background-image: linear-gradient($color, $color);
        background-size: $size $size;
        background-repeat: no-repeat;
        width: $size;
        height: $size;
    }
    .top {
        background-position: 0 0;
        animation: top-do $time ease infinite;
        -webkit-clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
    }
    .bottom {
        background-position: 0 $size;
        animation: bottom-do $time ease infinite;
        -webkit-clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        &:after {
            content: "";
            position: absolute;
            width: 2px;
            height: $size;
            left: ($size / 2) - 1px;
            background-image: linear-gradient($color, transparent);
        }
    }

    @keyframes top-do {
        95%, 100% {
            background-position: 0 $size;
        }
    }
    @keyframes bottom-do {
        95%, 100% {
            background-position:  0 0;
        }
    }
    @keyframes flip {
        0%, 95% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(180deg);
        }
    }
</style>