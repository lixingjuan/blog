self.onmessage = (message) => {
  self.postMessage({
    answer: Math.random() * 100
  })
}