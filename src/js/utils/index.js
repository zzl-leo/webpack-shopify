/*
 * @Date: 2022-09-22 18:17:55
 * @LastEditors: Leo
 * @LastEditTime: 2022-10-10 16:08:17
 * @FilePath: \test2\src\js\utils\index.js
 */

// query 格式化
export const urlQueryToObject = (url = window.location.href) => {
    const querys = url.split('?')[1] || []
    if (querys.length > 0) {
        return JSON.parse('{"' + decodeURI(querys).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
    }
    return {}
}


export const withInstall = (component, alias) => {
    const comp = component;
    comp.install = (app) => {
        console.log(app)
        app.component(comp.name || comp.displayName, component);
        if (alias) {
            app.config.globalProperties[alias] = component;
        }
    };
    return component;
};