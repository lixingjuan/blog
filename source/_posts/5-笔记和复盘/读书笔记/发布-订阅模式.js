/* ****************************************************************************************************
 *                                    发布订阅初版写法
 ************************************************************************************************* */

// 定义售楼处
const salesOffices = {
    clientList: new Map(), // 缓存列表，存放订阅者的回调函数
    listen: function (key, fn) { // 增加订阅者
        this.clientList.delete(key)
        this.clientList.set(key, fn)
    },
    trigger: function (messageKey) {
        const fn = this.clientList.get(messageKey)

        // 如果没有订阅该消息，则返回
        if (!fn) {
            return
        }

        // 遍历缓存列表，依次执行回调函数
        console.log(this.clientList.values())
        for (const [key, fn] of this.clientList) {
            if (key === messageKey) {
                fn.apply(this, arguments);
            }
        }
    }
};


// 下面我们来进行一些简单的测试:
salesOffices.listen('area', (price, squareMeter) => {
    console.log('我是小明价格= ' + price);
    console.log('squareMeter= ' + squareMeter);
});

salesOffices.listen('price', (price, squareMeter) => {
    console.log('我是小红价格= ' + price);
    console.log('squareMeter= ' + squareMeter);
});


salesOffices.trigger('area', 2000000); // 输出:2000000
// salesOffices.trigger('squareMeter100', 3000000); // 输出:3000000
