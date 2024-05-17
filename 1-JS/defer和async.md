## defer 和 async

|                  | defer                      | async                                  |
| ---------------- | -------------------------- | -------------------------------------- |
| 版本             | HTML4.01                   | HTML5                                  |
| 阻塞             | 立即下载，不阻塞，延迟执行 | 立即下载，不阻塞，延迟执行             |
| 执行时机         | `</html>`                  |                                        |
| DOMContentLoaded | DOMContentLoaded 之前执行  | onload 事件之前，DOMContentLoaded 前后 |
| 有序否？         | 有序                       | 无序                                   |

## 页面事件顺序

DOMContentLoaded => onload
