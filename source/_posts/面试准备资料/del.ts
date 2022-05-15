interface Person {
  name: string;
  age: number;
}

type TheName = Pick<Person, "age">;
type a = Omit<Person, "age">;

type c = Partial<Person>;

type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type MyOmit<T, K extends keyof T> = MyPick<T, Exclude<keyof T, K>>;
