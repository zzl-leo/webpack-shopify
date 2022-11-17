/*
 * @Date: 2022-09-29 13:35:03
 * @LastEditors: Leo
 * @LastEditTime: 2022-11-17 18:11:55
 * @FilePath: \test2\build\watch.js
 */
const shell = require("shelljs");
const exec = shell.exec;
const read = require('read-yaml');
const config = read.sync('config.yml');
let name = process.argv[2] || 'dev';
let branch = process.argv[3] || 'master'; // 第二个参数传分支名称

if(!config[name]) {
    shell.echo(`Error: 店铺参数${name}错误`);
    shell.exit(1);
}
console.log(`${name}店铺模板watching...`)

// exec(`cross-env process.env.SHOPIFY_STORE=${name} cross-env process.env.SHOPIFY_THEME=${branch} theme watch --dir=theme --env=${name}`)
exec(`cross-env process.env.SHOPIFY_STORE=${name} cross-env process.env.SHOPIFY_THEME=${branch} theme watch --dir=themes/${name}/${branch} --env=${name}`)