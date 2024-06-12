/**
 * 发布订阅，常用于事件的异步处理
 * 发布者和订阅者都是通过一个中间件进行交互
 * */
class EventBus {
  constructor() {
    this.listeners = [];
  }

  on(eventName, fn) {
    if (typeof fn === "function") {
      this.listeners.push({
        eventName,
        fn,
      });
    }
  }

  emit() {
    this.listeners.forEach((it) => it.fn());
  }

  off(eventName) {
    const targetIndex = this.listeners.findIndex((it) => it.eventName === eventName);
    if (targetIndex < 0) {
      return "error";
    }
    this.listeners.splice(targetIndex, 1);
    return "success";
  }
}

const eventBus1 = new EventBus();
eventBus1.on("say hello", () => {
  console.log("hello");
});

eventBus1.emit();

const resultStatus = eventBus1.off("say hello");
console.log(resultStatus);
