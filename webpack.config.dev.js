/*
 * @Date: 2022-09-27 18:24:11
 * @LastEditors: Leo
 * @LastEditTime: 2022-11-17 17:44:44
 * @FilePath: \test2\webpack.config.dev.js
 * @description: DEV配置
 */

const {
    merge
} = require('webpack-merge');
const common = require('./webpack.config.common.js');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = merge(common, {
    plugins: [
        new CopyPlugin({
            patterns: [{
                    from: path.resolve(__dirname, `src/liquid/dev/snippets/`),
                    to: path.resolve(__dirname, `themes/dev/${process.env.SHOPIFY_THEME || 'master'}/snippets/`),
                    noErrorOnMissing: true // 处理空文件夹报错
                },
                {
                    from: path.resolve(__dirname, 'src/liquid/dev/sections/'),
                    to: path.resolve(__dirname, `themes/dev/${process.env.SHOPIFY_THEME || 'master'}/sections/`),
                    noErrorOnMissing: true
                },
                {
                    from: path.resolve(__dirname, 'src/liquid/dev/layout/'),
                    to: path.resolve(__dirname, `themes/dev/${process.env.SHOPIFY_THEME || 'master'}/layout/`),
                    noErrorOnMissing: true
                },
                {
                    from: path.resolve(__dirname, 'src/liquid/dev/assets/'),
                    to: path.resolve(__dirname, `themes/dev/${process.env.SHOPIFY_THEME || 'master'}/assets/`),
                    noErrorOnMissing: true
                }
            ]
        })
    ]
})