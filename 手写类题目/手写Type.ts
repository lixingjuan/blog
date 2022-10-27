type MPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type MOmit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

type MRecord<K extends keyof any, T> = {
  [P in K]: T;
};

