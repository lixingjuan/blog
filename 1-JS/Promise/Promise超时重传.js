const withRetry = (requestFunc, maxRetryCount = 3) => {
  const attempt = (n) => {
    return new Promise((resolve, reject) => {
      const timeout = new Promise((_, reject) => setTimeout(reject, 3000, new Error("timeout")));

      Promise.race([requestFunc(), timeout]).then(resolve, (error) => {
        if (error.message === "timeout" && n < maxRetryCount) {
          console.log(`Attempt ${n}: Timed out, retrying...`);
          attempt(n + 1)
            .then(resolve)
            .catch(reject);
        } else {
          reject(error);
        }
      });
    });
  };

  return attempt(1);
};
