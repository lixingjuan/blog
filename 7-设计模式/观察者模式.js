class Subject {
  constructor() {
    this.observer = [];
  }

  addObserver(val) {
    this.observer.push(val);
  }

  removeObserver(val) {
    this.observer = this.observer.filter((it) => it !== val);
  }

  notify() {
    this.observer.forEach((it) => it.update());
  }
}
class Observer {
  constructor(name) {
    this.name = name;
  }
  update() {
    console.log("hello", this.name);
  }
}

const subject1 = new Subject();

subject1.addObserver(new Observer("Tom"));
subject1.addObserver(new Observer("Jell"));

subject1.notify();
