const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const package = require("./package.json");

module.exports = {
    entry: {
        index: "./src/index.js",
        vendor: Object.keys(package.dependencies),
        detail: "./src/detail.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default']
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html",
            chunks: ["vendor", "index"]
        }),
        new HtmlWebpackPlugin({
            template: "./src/detail.html",
            filename: "detail.html",
            chunks: ["vendor", "detail"]
        })
    ]
};