function a() {
  b();
}
function b() {
  c();
}

function c() {
  console.log(this);
}
a();
