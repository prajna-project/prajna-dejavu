const path = require('path');
const webpack = require('webpack');
const relativeToRootPath = './';
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: './dist/prajna-dejavu.js',
        library: 'prajna-dejavu',
        libraryTarget: 'commonjs2'
    },
    externals: ['cookie'],
    watch: true,
    devtool: 'source-map',
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
        modules: ['node_modules']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    'awesome-typescript-loader',
                    'source-map-loader',
                ],
                enforce: 'pre'
            },
        ]
    },
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
};
