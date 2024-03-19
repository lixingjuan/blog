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
