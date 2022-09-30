"use strict";

const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

module.exports = {

    mode: "production",

    entry: {
        spriter: ["./src/Spriter/index.ts"]
    },

    output: {
        path: `${__dirname}/dist/`,
        filename: "[name].min.js",
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
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    compress: {
                        drop_console: true,
                    },
                    output: {
                        comments: false,
                    },
                },
                extractComments: false,
            }),
        ],
    }
};
