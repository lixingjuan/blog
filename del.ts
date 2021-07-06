const Demo = () => {
  let x;
  if (Math.random() > 0.5) {
    x = 3;
  }
  if (Math.random() <= 0.5) {
    x = "3";
  }
  return x;
};

type Fish = {
  swim: () => {};
};

type Bird = {
  fly: () => {};
};

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

type IsFishType = ReturnType<typeof isFish>;

// 模版字符串
const Demo2 = (s: string): `hahaha ${string}` => {
  return `hahaha ${s}`;
};

type Demo2 = typeof Demo2;

type Colors = "red" | "green";
type Size = "big" | "small";
type Result = `${Colors | Size} fish`; // "red fish" | "green fish" | "big fish" | "small fish"

[1, "12", "8", 5].sort((a, b) => {
  if (Number(a) > Number(b)) {
    return true;
  } else {
    return false;
  }
});

const array = [1, 1, 1, 1, 2];

for (let index = 0; index < array.length; index++) {
  const element = array[index];

  for (
    let startIndex = index + 1;
    index < array.length - startIndex;
    startIndex++
  ) {
    const nextElement = array[startIndex];
    if (element === nextElement) {
      array.splice(index + 1, 1);
    } else {
      break;
    }
  }
}

console.log(array);
