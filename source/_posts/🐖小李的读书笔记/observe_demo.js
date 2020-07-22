const salesoffices = {}

salesoffices.clientList = [] // 缓存列表，存放订阅者的回调函数

// 增加订阅者
salesoffices.listen = function(fn) {
  this.clientList.push(fn) // 订阅的消息添加进缓存列表
}

salesoffices.trigger = function() {
  for (var i = 0, fn; (fn = this.clientList[i++]); ) {
    fn.apply(this, arguments) // arguments 是发布消息时带上的参数
  }
}

/* 测试 */
// 小明订阅消息
salesoffices.listen(function(price, squareMeter) {
  console.log('价格' + price)
  console.log('squareMeter' + squareMeter)
})

// 小红订阅消息
salesoffices.listen(function(price, squareMeter) {
  console.log('价格' + price)
  console.log('squareMeter' + squareMeter)
})

// 发布消息
salesoffices.trigger(2000, 88)
salesoffices.trigger(3000, 40)
