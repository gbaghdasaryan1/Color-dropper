const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, "src", "index.ts"),
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "[name].[contenthash].js",
        clean: true
    },
    mode: "production",
    plugins: [new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public", "index.html"),
    })],

    module: {
        rules: [{
            test: /\.ts?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        }, {
            test: /\.(png|jpg|jpeg|gif)$/i,
            type: 'public',
        }],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    devServer: {
        port: 5000,
        open: true
    }
}