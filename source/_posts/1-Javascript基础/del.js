let p1 = Promise.reject("foo");

p1.then().catch((res) => console.log(res));
