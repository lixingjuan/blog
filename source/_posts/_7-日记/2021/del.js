var isValid = function(s) {
    const n = s.length;
    if (n % 2 === 1) {
        return false;
    }
    const pairs = new Map([
        [')', '('],
        [']', '['],
        ['}', '{']
    ]);
    const stk = [];
    for (let i = 0; i < s.length; i++) {
        if (pairs.has(s[i])) {
            if (!stk.length || stk[stk.length - 1] !== pairs.get(s[i])) {
                return false;
            }
            stk.pop();
        }
        else {
            stk.push(s[i]);
        }
    }
    return !stk.length;
};
const str = '[]{((])}()'

console.log(isValid(str))
