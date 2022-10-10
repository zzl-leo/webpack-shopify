/*
 * @Date: 2022-10-10 11:00:37
 * @LastEditors: Leo
 * @LastEditTime: 2022-10-10 16:14:11
 * @FilePath: \test2\src\js\assets\cdp.js
 */
import jackerySensors from '../utils/ja.js'

window.jackerySensors.init({
    server_url: 'https://cdpdata.myjackery.com/sa',
    send_type: 'beacon',
    heatmap: {
        clickmap: 'default',
        scroll_notice_map: 'default'
    }
});

window.jackerySensors.quick('autoTrack');