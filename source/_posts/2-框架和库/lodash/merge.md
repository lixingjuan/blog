```js
const merge = createAssigner(function(object, source, srcIndex) {
  baseMerge(object, source, srcIndex);
});

const users = {
    'data': [{ 'user': 'barney' }, { 'user': 'fred' }]
};

const ages = {
    'data': [{ 'age': 36 }, { 'age': 40 }]
};

const res = merge(users, ages)

console.log(res === users)
console.log(res === ages)
```