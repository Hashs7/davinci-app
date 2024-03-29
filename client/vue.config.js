module.exports = {
    chainWebpack: (config) => {
        const svgRule = config.module.rule('svg');

        svgRule.uses.clear();

        svgRule
            .use('babel-loader')
            .loader('babel-loader')
            .end()
            .use('vue-svg-loader')
            .loader('vue-svg-loader');
    },
    devServer: {
        host: '0.0.0.0',
        hot: true,
        disableHostCheck: true,
    },
    css: {
        loaderOptions: {
            scss: {
                prependData: `@import "~@/styles/0-settings/_settings-color.scss";`,
                // font: `@import "~@/style/fonts.scss";`,
            },
        }
    }
};