"use strict";

const path = require('path');

module.exports = {

    mode: "development",

    devtool: "source-map",

    entry: {
        test: ["./src/App.ts"]
    },

    output: {
        path: `${__dirname}/js/`,
        filename: "[name].js",
        library: "Game",
        libraryTarget: "umd",
        sourceMapFilename: "[file].map",
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
    }
};
