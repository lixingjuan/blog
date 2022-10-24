class Person {
  constructor(age) {
    this.age = age
  }

  sayAge() {
    console.log(this.age)
  }
}

class Girl extends Person {
  sex = 'girl';
}


const lily = new Girl('lily')
console.log(lily.sex)
console.log(lily.age)
lily.sayAge()

