/*
 * @Date: 2022-10-10 10:38:18
 * @LastEditors: Leo
 * @LastEditTime: 2022-10-10 10:40:23
 * @FilePath: \test2\webpack.config.us.js
 */

const {
    merge
} = require('webpack-merge');
const common = require('./webpack.config.common.js');
const CopyPlugin = require('copy-webpack-plugin');

const path = require('path');

const shopifyTheme = process.env.SHOPIFY_THEME || 'master';

const caWebpackConfig = merge(common, {
    mode: 'production',
    plugins: []
})

module.exports = merge(common, {
    plugins: [
        new CopyPlugin({
            patterns: [{
                    from: path.resolve(__dirname, `src/liquid/us/snippets/`),
                    to: path.resolve(__dirname, `themes/us/${shopifyTheme}/snippets/`),
                    noErrorOnMissing: true // 处理空文件夹报错
                },
                {
                    from: path.resolve(__dirname, 'src/liquid/us/sections/'),
                    to: path.resolve(__dirname, `themes/us/${shopifyTheme}/sections/`),
                    noErrorOnMissing: true
                },
                {
                    from: path.resolve(__dirname, 'src/liquid/us/layout/'),
                    to: path.resolve(__dirname, `themes/us/${shopifyTheme}/layout/`),
                    noErrorOnMissing: true
                },
                {
                    from: path.resolve(__dirname, 'src/liquid/us/assets/'),
                    to: path.resolve(__dirname, `themes/us/${shopifyTheme}/assets/`),
                    noErrorOnMissing: true
                }
            ]
        })
    ]
})