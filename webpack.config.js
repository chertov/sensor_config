
const path = require('path');
const WebpackNotifierPlugin = require('webpack-notifier');
// const CircularDependencyPlugin = require('circular-dependency-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const browser = {
    name: 'Browser',
    entry: './tsx/app.tsx',
    output: {
        path: path.resolve(__dirname, './docs/js'),
        filename: 'bundle.js'
    },

    stats: { children: false }, // prevent spam-logs in console
    watch: true,
    cache: true,
    devtool: 'source-map',
    mode: 'development',
    resolve: {
        modules: [path.resolve(__dirname, 'tsx'), path.resolve(__dirname, 'node_modules')],
        alias: {
            joi: 'joi-browser'
        },
        extensions: ['*', '.js', '.jsx', '.ts', '.tsx']
    },
    module: {
        rules: [
            { test: /\.(ts|tsx)?$/, exclude: /node_modules/, include: [path.resolve(__dirname, 'tsx')], loader: 'ts-loader' },
            { test: /\.(js|jsx)$/, exclude: /node_modules/, include: [path.resolve(__dirname, 'tsx')], loader: 'babel-loader' },
            
            { test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: {
                        loader: 'css-loader',
                        options: { modules: true, localIdentName: '[name]__[local]--[hash:base64:5]', sourceMap: true }
                    }
                })
            }
        ]
    },
    plugins: [
        // new BundleAnalyzerPlugin(),
        new ExtractTextPlugin('./../css/bundle.css'),
        // new webpack.optimize.DedupePlugin(),
        // new webpack.optimize.UglifyJsPlugin(),
        new WebpackNotifierPlugin({ excludeWarnings: true, alwaysNotify: true }),
        new ProgressBarPlugin(),
        // new TsconfigPathsPlugin({ configFile: './tsconfig.json' })
        // new CircularDependencyPlugin({
        //     // add errors to webpack instead of warnings
        //     failOnError: false
        // })
    ]
};

module.exports = [browser];
