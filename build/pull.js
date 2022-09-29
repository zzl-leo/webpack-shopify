/*
 * @Date: 2022-09-29 11:17:07
 * @LastEditors: Leo
 * @LastEditTime: 2022-09-29 16:05:44
 * @FilePath: \webpack-shopify\build\get.js
 * @description: 拉取指定店铺模板
 */
const shell = require("shelljs");
const exec = shell.exec;
const read = require('read-yaml');
const config = read.sync('config.yml');
let name = process.argv[2] || 'ca'; // 第一个参数传店铺
let branch = process.argv[3] || 'master'; // 第二个参数传分支名称

if(!config[name]) {
    shell.echo(`Error: 店铺参数${name}错误`);
    shell.exit(1);
}
console.log(`${name}店铺${branch}拉取中...`)

// `git subtree pull --prefix=themes/${name}/${branch} ${name.toUpperCase()} ${branch} --squash`

exec(`git subtree pull --prefix=themes/${name}/${branch} ${name.toUpperCase()} ${branch} --squash`)