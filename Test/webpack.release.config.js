"use strict";

const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const path = require('path');

module.exports = {

    mode: "production",

    entry: {
        test: ["./src/App.ts"]
    },

    output: {
        path: `${__dirname}/js/`,
        filename: "[name].js",
        library: "Game",
        libraryTarget: "umd",
        umdNamedDefine: true
    },

    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"],
        alias: {
        }
    },

    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            }
        ]
    },

    performance: { hints: false },

    optimization: {
        minimizer: [
            new UglifyJSPlugin({
                include: "test.js",
                parallel: true,
                sourceMap: false,
                uglifyOptions: {
                    compress: true,
                    ie8: false,
                    ecma: 5,
                    output: { comments: false },
                    warnings: false
                },
                warningsFilter: () => false
            })
        ]
    }
};
