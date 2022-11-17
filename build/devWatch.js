/*
 * @Date: 2022-09-29 11:40:36
 * @LastEditors: Leo
 * @LastEditTime: 2022-11-17 17:52:42
 * @FilePath: \test2\build\devWatch.js
 */
const shell = require("shelljs");
const exec = shell.exec;
const read = require('read-yaml');
const config = read.sync('config.yml');
let name = process.argv[2] || 'ca';
let branch = process.argv[3] || 'master'; // 第二个参数传分支名称

if(!config[name]) {
    shell.echo(`Error: 店铺参数${name}错误`);
    shell.exit(1);
}
console.log(`${name}店铺开发预览...`)

exec(`cross-env process.env.SHOPIFY_STORE=dev cross-env process.env.SHOPIFY_THEME=${branch} webpack --config webpack.config.${name}.js --watch`)