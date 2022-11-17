/*
 * @Date: 2022-09-27 18:24:11
 * @LastEditors: Leo
 * @LastEditTime: 2022-11-17 14:22:13
 * @FilePath: \test2\webpack.config.uk.js
 * @description: UK配置
 */

const {
    merge
} = require('webpack-merge');
const common = require('./webpack.config.common.js');
const CopyPlugin = require('copy-webpack-plugin');
const shopifyTheme = process.env.SHOPIFY_THEME || 'master';

const path = require('path');

const caWebpackConfig = merge(common, {
    mode: 'production',
    plugins: []
})

module.exports = merge(common, {
    plugins: [
        new CopyPlugin({
            patterns: [{
                    from: path.resolve(__dirname, `src/liquid/uk/snippets/`),
                    to: path.resolve(__dirname, `themes/uk/${shopifyTheme}/snippets/`),
                    noErrorOnMissing: true // 处理空文件夹报错
                },
                {
                    from: path.resolve(__dirname, 'src/liquid/uk/sections/'),
                    to: path.resolve(__dirname, `themes/uk/${shopifyTheme}/sections/`),
                    noErrorOnMissing: true
                },
                {
                    from: path.resolve(__dirname, 'src/liquid/uk/layout/'),
                    to: path.resolve(__dirname, `themes/uk/${shopifyTheme}/layout/`),
                    noErrorOnMissing: true
                },
                {
                    from: path.resolve(__dirname, 'src/liquid/uk/assets/'),
                    to: path.resolve(__dirname, `themes/uk/${shopifyTheme}/assets/`),
                    noErrorOnMissing: true
                }
            ]
        })
    ]
})