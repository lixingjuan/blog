/** 迭代 */
function Fibonacci(n) {
  if (n <= 2) {
    return 1;
  }

  const memo = [0, 1, 1];

  for (let i = 3; i <= n; i++) {
    memo[i] = memo[i - 1] + memo[i - 2];
  }

  return memo[n];
}

/** 递归 */
function Fibonacci2(n) {
  if (n <= 2) {
    return 1;
  }

  return Fibonacci2(n - 1) + Fibonacci2(n - 2);
}

module.exports = {
  Fibonacci: Fibonacci,
};

// console.log(Fibonacci(1));
// console.log(Fibonacci(2));
console.log(Fibonacci2(4));
// console.log(Fibonacci(4));

// [0, 1, 2, 3, 5]
