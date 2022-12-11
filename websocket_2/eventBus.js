/*
 * @Date: 2022-12-11 21:00:12
 * @LastEditors: zhangshuangli
 * @LastEditTime: 2022-12-11 22:55:07
 * @Description: 这是****文件
 */
// 自定义通信事件
// 用到了发布订阅模式
class EventBus {
  constructor() {
    // 消息中心，记录了所有的事件 以及 事件对应的处理函数
    this.subs = Object.create(null)
  }

  // 注册时间
  // 参数：1.事件名称  2.事件处理函数
  on(eventType, handler) {
    this.subs[eventType] = this.subs[eventType] || []
    this.subs[eventType].push(handler)
  }

  // 触发事件
  // 参数： 1.事件名称 2.接收的参数
  emit(eventType, ...ars) {
    if(this.subs[eventType]) {
      this.subs[eventType].forEach(handler => {
        handler(...ars)
      })
    }
  }
}

export default new EventBus()