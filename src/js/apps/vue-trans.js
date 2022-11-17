/*
 * @Date: 2022-09-22 18:34:19
 * @LastEditors: Leo
 * @LastEditTime: 2022-11-17 13:46:08
 * @FilePath: \test2\src\js\apps\vue-trans.js
 */

import {
    defineComponent,
    h,
    render
} from 'vue'

// 生成一个唯一的key
const COMPONENT_CONTAINER_SYMBOL = Symbol('component_container')

/**
 * 创建组件实例对象
 * 返回的实例和调用
 * @param {*} Component
 */
 export function createComponent(Component, props, children) {
    const vnode = h(Component, { ...props }, children)
    const container = document.createElement('div')
    vnode[COMPONENT_CONTAINER_SYMBOL] = container
    render(vnode, container)
    return vnode.component
}

/**
 * 销毁组件实例对象
 * @param {*} ComponnetInstance 通过createComponent方法得到的组件实例对象
 */
export function unmountComponent(ComponnetInstance) {
    render(null, ComponnetInstance.vnode[COMPONENT_CONTAINER_SYMBOL])
}