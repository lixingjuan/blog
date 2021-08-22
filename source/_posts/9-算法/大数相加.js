/**
 * js的数字的安全范围
 * Number.MAX_SAFE_INTEGER
 * Number.MIN_SAFE_INTEGER
 */
let valA = "2";
let valB = "134";

function add(valA, valB) {
    // 取两个数字的最大长度
    let maxLength = Math.max(valA.length, valB.length);

    // 用0去补齐长度
    valA = valA.padStart(maxLength, 0); // "0009007199254740991"
    valB = valB.padStart(maxLength, 0); // "1234567899999999999"

    // 定义加法过程中需要用到的变量
    let t = 0;
    let f = 0; // "进位"
    let sum = "";

    for (let i = maxLength - 1; i >= 0; i--) {
        t = parseInt(valA[i]) + parseInt(valB[i]) + f;
        console.log('t',t);

        f = Math.floor(t / 10);
        console.log('f',f);

        sum = (t % 10) + sum;
        console.log('sum',sum);
    }

    if (f == 1) {
        sum = "1" + sum;
    }
    return sum;
}

console.log(add(valA, valB));
