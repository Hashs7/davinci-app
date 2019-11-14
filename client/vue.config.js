module.exports = {
    chainWebpack: (config) => {
        const svgRule = config.module.rule('svg');

        svgRule.uses.clear();

        svgRule
            .use('vue-svg-loader')
            .loader('vue-svg-loader');
    },
    css: {
        loaderOptions: {
            sass: {
                data: `@import "~@/styles/0-settings/_settings-color.scss";`,
                // font: `@import "~@/style/fonts.scss";`,
            },
        }
    }
};