// const array = Array.from({ length: 100000000 }).map((it, index) => index)


// console.time('indexof111');
// for (let index = 0; index < array.length; index++) {
//     const element = array[index];
//     array.indexOf(element);
// }
// console.timeEnd('indexof111');

// console.time('includes')
// for (let index = 0; index < array.length; index++) {
//     const element = array[index];
//     array.includes(element)
// }
// console.timeEnd('includes')


const ARR_SIZE = 10000000;
const hugeArr = new Array(ARR_SIZE).fill(1);

// includes
const includesTest = () => {
    const arrCopy = [];
    console.time('includes')
    let i = 0;
    while (i < hugeArr.length) {
        arrCopy.includes(hugeArr[i]);
        i = i + 1
    }

    console.timeEnd('includes');
}

// indexOf
const indexOfTest = () => {
    const arrCopy = [];
    console.time('indexOf');
    // for (let item of hugeArr) {
    //     arrCopy.indexOf(item);
    // }
    for (let index = 0; index < hugeArr.length; index++) {
        const element = hugeArr[index];
        hugeArr.indexOf(element);
    }
    console.timeEnd('indexOf');
}

includesTest();
indexOfTest();