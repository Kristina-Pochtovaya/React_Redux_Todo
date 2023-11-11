const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.tsx',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(js|jsx|tsx|ts)$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                options: { presets: ['@babel/env', '@babel/preset-flow'] }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    resolve: { extensions: ['*', '.js', '.jsx', '.ts', '.tsx'] },
    output: {
        path: path.resolve(__dirname, 'dist/'),
        // publicPath: '/dist/',
        publicPath: 'http://localhost:3000/dist/',
        filename: 'bundle.js'
    },
    devServer: {
        static: {
            directory: path.join(__dirname,'public/'),
        },
        port: 3000,
        hot: true,
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
}