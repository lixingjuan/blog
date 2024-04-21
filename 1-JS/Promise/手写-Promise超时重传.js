const withRetry = (requestFunc, maxRetryCount = 3) => {
  const attempt = (n) => {
    return new Promise((resolve, reject) => {
      const timeout = new Promise((_, reject) => setTimeout(reject, 3000, new Error("timeout")));

      Promise.race([requestFunc(), timeout]).then(resolve, (error) => {
        if (error.message !== "timeout" || n >= maxRetryCount) {
          reject(error);
          return;
        }

        // 如果超时 & 没有超过最大重试次数, 调用这个函数，并把当前重试次数+1
        console.log(`Attempt ${n}: Timed out, retrying...`);
        attempt(n + 1)
          .then(resolve)
          .catch(reject);
      });
    });
  };

  return attempt(1);
};
