/* 发布订阅 */

const ControllerObj = {
    arr: [],
    subscribe: function (key, event) {
        this.arr.push({
            key,
            event
        })

    },
    emit: function (key) {
        if (key) {

            this.arr.filter(it => it.key === key).forEach(it => it.event())
        }
        this.arr.forEach(it => it.event())
    },
}

ControllerObj.subscribe('lixingjuan', () => {
    console.log('lixingjuan')
})

ControllerObj.emit('')