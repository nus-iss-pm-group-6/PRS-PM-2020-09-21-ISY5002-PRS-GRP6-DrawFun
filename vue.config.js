const path = require('path');

module.exports = {
    assetsDir: 'static',
    runtimeCompiler: true,
    chainWebpack: config => {
        // title
        config
            .plugin('html')
            .tap(([htmlArgs]) => {
                htmlArgs.title = 'DrawFun';
                return [htmlArgs];
            });
        // favicon
        config
            .plugin('copy')
            .tap(([copyArgs]) => {
                return [[...copyArgs ?? [], {
                    from: path.resolve(__dirname, 'src/assets/img/favicon.ico'),
                    to: path.resolve(__dirname, `dist/${this.assetsDir}/img/`),
                }]];
            });
    },
    css: {
        loaderOptions: {
            sass: {
                sassOptions: {
                    includePaths: ['./node_modules']
                }
            }
        }
    },
    devServer: {
        proxy: 'http://localhost:5000'
    }
};
