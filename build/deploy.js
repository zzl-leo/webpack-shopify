#!/usr/bin/env node
/*
 * @Date: 2022-09-29 10:23:32
 * @LastEditors: Leo
 * @LastEditTime: 2022-10-08 10:09:45
 * @FilePath: \test2\build\deploy.js
 * @description: 构建并发布到指定模板命令（theme清空-theme get-构建-theme 同步到店铺模板）
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
console.log(`${name}店铺模板开始构建并publish...`)

// exec(`npm run get ${name} && cross-env process.env.SHOPIFY_STORE=${name} webpack --config webpack.config.${name}.js --mode=production && npm run push ${name}`)
exec(`cross-env process.env.SHOPIFY_STORE=${name} cross-env process.env.SHOPIFY_THEME=${branch} webpack --config webpack.config.${name}.js --mode=production`) //  && npm run push ${name}