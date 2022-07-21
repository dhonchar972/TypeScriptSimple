const a: number = 1 + 2;
const b: number = a + 3;
const c = {
  apple: a,
  banana: b
};
const t: { f: number; g: number } = {
  f: 12,
  g: 40
};
let h: {
  t: number;
  z?: string; // optional
  [key: number]: boolean; // can have any count of number parameters with booleans values
};
const user: { readonly firstName: string } = {
  firstName: "abby"
};
c.apple = 4;
console.log(c.apple);
console.log(typeof c); // Object

function squareOf(n: number): number {
  return n * n;
}

console.log(squareOf(c.banana));
// squareOf("z"); // wrong type
console.log(squareOf(parseInt("3"))); // this work
// any > unknown, boolean, number, bigint, string, symbol, object, Array, Tuple, enum
// null, undefined, void, never,
type Age = number; // alias
type Person = {
  name: string;
  age: Age;
};
type Cat = { name: string; purrs: boolean };
type Dog = { name: string; barks: boolean; wags: boolean };
type CatOrDogOrBoth = Cat | Dog;
type CatAndDog = Cat & Dog;

const g: string[] = ["a", "d", "t"]; // array

const k = [1, "a"];
k.map((_) => {
  if (typeof _ === "number") {
    return _ * 3;
  }
  return _.toUpperCase();
});

const x: [number] = [1]; // tuple, must specify type, array can skip it

const trainFares: [number, number?][] = [[3.75], [8.25, 7.7], [10.5]];
const friends: [string, ...string[]] = ["Sara", "Tali", "Chloe", "Claire"];

const as: readonly number[] = [1, 2, 3];
const bs: readonly number[] = as.concat(4);

type A = readonly string[]; // readonly string[]
type B = ReadonlyArray<string>; // readonly string[]
type C = Readonly<string[]>; // readonly string[]
type D = readonly [number, string]; // readonly [number, string]
type E = Readonly<[number, string]>; // readonly [number, string]

enum Language {
  English,
  Spanish,
  Russian
}

// same to //

// enum Language {
//   English = 0,
//   Spanish = 1,
//   Russian = 2
// }
const myFirstLanguage = Language.Russian;
const mySecondLanguage = Language["English"];
// enum Language {
//   English = 100,
//   Spanish = 200 + 300,
//   Russian // 501
// }
enum Color {
  Red = "#c10000",
  Blue = "#007ac1",
  Pink = 0xc10050,
  White = 255
}
let a = Color.Red; // Color
//let b = Color.Green; // error
let c = Color[0];
let d = Color[6]; // all fine, typescript don't care, use const!!!

const enum Flippable {
  Burger = "Burger",
  Chair = "Chair",
  Cup = "Cup",
  Skateboard = "Skateboard",
  Table = "Table"
}
let i: 3 = 3;
i = 4;
