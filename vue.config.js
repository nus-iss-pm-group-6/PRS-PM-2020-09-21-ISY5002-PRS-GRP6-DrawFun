const path = require('path');
const WorkerPlugin = require('worker-plugin');

const assets_dir = 'static';

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '.' : '/',
    assetsDir: assets_dir,
    runtimeCompiler: true,
    // configureWebpack: {
    //     plugins: [
    //         new WorkerPlugin
    //     ]
    // },
    chainWebpack: config => {
        // debug
        config.merge({
            devtool: 'source-map'
        });
        config.output
            .devtoolModuleFilenameTemplate(info => {
                return info.resourcePath.match(/\.vue$/) && info.allLoaders ?
                    `webpack-generated:///${info.resourcePath}?${info.hash}` :
                    `webpack:///${info.resourcePath}`;
            });
        // title
        config.plugin('html')
            .tap(([htmlArgs]) => {
                htmlArgs.title = 'DrawFun';
                return [htmlArgs];
            });
        // favicon
        config.plugin('copy')
            .tap(([copyArgs]) => {
                return [[...copyArgs ?? [], {
                    from: path.resolve(__dirname, 'src/assets/img/favicon.ico'),
                    to: path.resolve(__dirname, `dist/${assets_dir}/img/`),
                }]];
            });
        // models
        config.plugin('copy')
            .tap(([copyArgs]) => {
                return [[...copyArgs ?? [], {
                    from: path.resolve(__dirname, 'src/assets/models'),
                    to: path.resolve(__dirname, `dist/${assets_dir}/models`),
                }]];
            });
        // worker
        config.plugin('worker')
            .use(WorkerPlugin, [{
                filename: '[name].worker.js'
            }]);
        config.module
            .rule('eslint').exclude
            .add(/\.worker\.js$/)
            .add(path.resolve(__dirname, 'src/3rdparty'))
            .end();
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
