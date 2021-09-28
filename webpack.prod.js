const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtract = require('mini-css-extract-plugin');
const copyPlugin = require('copy-webpack-plugin');

const cssMinimizer = require('css-minimizer-webpack-plugin');
const terser = require('terser-webpack-plugin');

module.exports = {

    mode: 'development',
    output: {
        clean: true,
        filename: 'main.[contenthash].js'
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    sources: false,
                }
            },
            {
                test: /\.css$/,
                exclude: /style.css$/,
                use: [ 'style-loader', 'css-loader']
            },
            {
                test: /style.css$/,
                use: [MiniCssExtract.loader, 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader:'file-loader',
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new cssMinimizer(),
            new terser(),
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),

        new MiniCssExtract({
            filename: '[name].[fullhash].css',
            ignoreOrder: false
        }),

        new copyPlugin ({
            patterns: [
                {from: 'src/assets/', to: 'assets/'}
            ]
        })
    ]
}