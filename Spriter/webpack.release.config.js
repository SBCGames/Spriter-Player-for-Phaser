"use strict";

const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const path = require('path');

module.exports = {

    mode: "production",

    entry: {
        spriter: ["./src/Spriter/index.ts"]
    },

    output: {
        path: `${__dirname}/js/`,
        filename: "[name].js",
        library: "Spriter",
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
                include: "spriter.js",
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
