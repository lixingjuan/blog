const quickSort = (arr) => {
  if (arr.length < 2) {
    return arr
  }


  const pivot = arr[0];
  const less = []
  const greater = []

  for (let i = 1; i < arr.length; i++) {
    const element = arr[i];
    if (element <= pivot) {
      less.push(element)
    } else {
      greater.push(element)
    }
  }

  return [...quickSort(less), pivot, ...quickSort(greater)]
}

console.log(quickSort([]))
console.log(quickSort([1]))
console.log(quickSort([1,2,3]))
console.log(quickSort([3,2,1]))