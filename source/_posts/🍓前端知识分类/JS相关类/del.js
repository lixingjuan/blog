const demo = {
  value: 0,
  add1: function() {
    console.log((this.value = this.value + 1));
    return this;
  },
  sub1: function() {
    console.log((this.value = this.value - 1));
    return this;
  }
};

demo
  .add1()
  .add1()
  .sub1()
  .sub1();
