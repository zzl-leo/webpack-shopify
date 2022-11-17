/*
 * @Date: 2022-09-22 18:32:37
 * @LastEditors: Leo
 * @LastEditTime: 2022-11-17 13:45:38
 * @FilePath: \test2\src\js\apps\vue-t2.js
 */
import TestComp from './test.vue'
import {
    defineComponent
} from 'vue'

import {
    unmountComponent,
    createComponent
} from './vue-trans'

console.log(TestComp)
console.log(TestComp.add)

const componentConstructor = defineComponent(TestComp)

// 创建一个变量接收创建的组件实例
let instance;

// 创建节点
const showTestComponent = (options) => {
  instance = createComponent(componentConstructor, options, null)
  // 插入到父元素
  const parentNodes = options.parentNodes ? options.parentNodes : document.body
  parentNodes.appendChild(instance.vnode.el)
}

// options为组件的props
export const testComp = function (options) {
//   const close = options.onClose
//   // 重新封装close，添加移除元素操作
//   options.onClose = () => {
//     close && close.call()
//     unmountComponent(instance)
//   }
  showTestComponent(options)
}