import { prototype } from "module";

interface Cat {
  name: string;
  run(): void;
}
interface Fish {
  name: string;
  swim(): void;
  [propName: string]: string | object;
}

const fish: Fish = {
  name: "xiaohua",
  swim: () => {
    console.log("pupupu");
  },
  age: "23",
  height: "230",
};
