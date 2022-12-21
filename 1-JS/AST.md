ast,
1. 记录了语法类型type：变量声明、函数等
2. "kind": "const"
3.  代码开始和结束为止
4.  body

```js
const a = 1;

function demo(){}
```



```json
{
  "type": "Program",
  "start": 0,
  "end": 31,
  "body": [
    {
      "type": "VariableDeclaration",
      "start": 0,
      "end": 12,
      "declarations": [
        {
          "type": "VariableDeclarator",
          "start": 6,
          "end": 11,
          "id": {
            "type": "Identifier",
            "start": 6,
            "end": 7,
            "name": "a"
          },
          "init": {
            "type": "Literal",
            "start": 10,
            "end": 11,
            "value": 1,
            "raw": "1"
          }
        }
      ],
      "kind": "const"
    },
    {
      "type": "FunctionDeclaration",
      "start": 14,
      "end": 31,
      "id": {
        "type": "Identifier",
        "start": 23,
        "end": 27,
        "name": "demo"
      },
      "expression": false,
      "generator": false,
      "async": false,
      "params": [],
      "body": {
        "type": "BlockStatement",
        "start": 29,
        "end": 31,
        "body": []
      }
    }
  ],
  "sourceType": "module"
}
```