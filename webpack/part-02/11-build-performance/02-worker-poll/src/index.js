class A {
  constructor() {
    this.a = 100
  }

  printA() {
    console.log(this.a);
  }
}

const aInstance = new A();
A.printA();