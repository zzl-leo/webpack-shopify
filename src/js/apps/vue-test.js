/*
 * @Date: 2022-09-22 18:10:07
 * @LastEditors: Leo
 * @LastEditTime: 2022-11-17 13:45:46
 * @FilePath: \test2\src\js\apps\vue-test.js
 */

import {
    h
} from "vue";

import {withInstall} from '../utils/index'

const Heading = (props, context) => {
    console.log(context);
    return h(`h${props.level}`, context.attrs, context.slots);
};

Heading.props = ["level"];

export default withInstall(Heading);

