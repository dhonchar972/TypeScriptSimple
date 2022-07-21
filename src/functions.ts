function add(a: number, b: number): number {
  return a + b;
}

// Именованная функция(named function)
function greet(name: string) {
  return "hello " + name;
}
// Функциональное выражение(anonymous function expression)
const greet2 = function (name: string) {
  return "hello " + name;
};
// Выражение стрелочной функции(arrow function expression)
const greet3 = (name: string) => {
  return "hello " + name;
};
// Сокращенное выражение стрелочной функции(short arrow function expression)
const greet4 = (name: string) => "hello " + name;
// Конструктор функции(Function() constructor), bad choice, don't use
const greet5 = new Function("name", 'return "hello " + name');

//can use default value (userId = "Not signed in")
function log(message: string, userId?: string) {
  const time = new Date().toLocaleTimeString();
  console.log(time, message, userId || "Not signed in");
}
log("Page loaded"); // Not signed in
log("User signed in", "da763be");

function sum(numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}
console.log(sum([1, 2, 3]));

// function sumVariadic(): number {
//   return Array
//     .from(arguments) // bad choice
//     .reduce((total, n) => total + n, 0)
// }
// sumVariadic(1, 2, 3)

function sumVariadicSafe(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}
console.log(sumVariadicSafe(1, 2, 3));

function addTwo(a: number, b: number): number {
  return a + b;
}
addTwo(10, 20);
addTwo.apply(null, [10, 20]);
addTwo.call(null, 10, 20);
addTwo.bind(null, 10, 20)();

function fancyDate(this: Date) {
  return `${this.getDate()}/${this.getMonth()}/${this.getFullYear()}`;
}
fancyDate.call(new Date()); // all fine
//fancyDate(); The 'this' context of type 'void' is not assignable to method's 'this' of type 'Date'.ts(2684)

// function generators
function* createFibonacciGenerator() {
  // "*" mark function as generator
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}
const fibonacciGenerator = createFibonacciGenerator(); // function call create and give IterableIterator
fibonacciGenerator.next(); // 0
fibonacciGenerator.next(); // 1
fibonacciGenerator.next(); // 1
fibonacciGenerator.next(); // 2
fibonacciGenerator.next(); // 3
fibonacciGenerator.next(); // 5

function* createNumbers(): IterableIterator<number> {
  let n = 0;
  while (1) {
    yield n++;
  }
}
const numbers = createNumbers();
numbers.next(); // 0
numbers.next(); // 1
numbers.next(); // 2

// iterator, must implement Symbol.iterable and .next()
const numbersTwo = {
  *[Symbol.iterator]() {
    for (let n = 1; n <= 10; n++) {
      yield n;
    }
  }
};

// Производить итерирование по итератору с помощью for-of
for (let n of numbers) {
  // 1, 2, 3 и т.д.
}
// Распространить итератор
let allNumbers = [...numbers]; // number[]
// Деструктурировать итератор
let [one, two, ...rest] = numbers; // [number, number, number[]]

// функция greet(name: string)
type Greet = (name: string) => string;
// функция log(message: string, userId?: string)
type LogTwo = (message: string, userId?: string) => void;
type LogThree = {
  (message: string, userId?: string): void; // same!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
};
// функция sumVariadicSafe(...numbers: number[]): number
type SumVariadicSafe = (...numbers: number[]) => number;

const logTwo: LogTwo = (message, userId = "Not signed in") => {
  const time = new Date().toISOString();
  console.log(time, message, userId);
};

// обратный вызов(callback)
function timesShort(f: (index: number) => void, n: number) {
  // readability at the highest level!!!!!!!!!
  for (let i = 0; i < n; i++) {
    f(i);
  }
}
function timesFull(f: { (index: number): void }, n: number) {
  for (let i = 0; i < n; i++) {
    f(i);
  }
}
timesShort((n) => console.log(n), 4);
timesFull(function (n) {
  console.log(n);
}, 4);

// function overloading
type Reserve = {
  (from: Date, to: Date, destination: string): Reservation;
  (from: Date, destination: string): Reservation;
};
const reserve: Reserve = (
  from: Date,
  toOrDestination: Date | string,
  destination?: string
) => {
  if (toOrDestination instanceof Date && destination !== undefined) {
    // Book a one-way trip
  } else if (typeof toOrDestination === "string") {
    // Book a round trip
  }
};

// special html overload in typescript
// type CreateElement = {
//   (tag: "a"): HTMLAnchorElement;
//   (tag: "canvas"): HTMLCanvasElement;
//   (tag: "table"): HTMLTableElement;
//   (tag: string): HTMLElement;
// };
// const createElement: CreateElement = (tag: string): HTMLElement => {
//   // ...
// };

// alternative
function createElement(tag: "a"): HTMLAnchorElement;
function createElement(tag: "canvas"): HTMLCanvasElement;
function createElement(tag: "table"): HTMLTableElement;
function createElement(tag: string): HTMLElement {
  //
}

//overload
type Filter = {
  (array: number[], f: (item: number) => boolean): number[];
  (array: string[], f: (item: string) => boolean): string[];
  (array: object[], f: (item: object) => boolean): object[];
};

//обобщения(type generalization)
type FilterGeneralization = {
  <T>(array: T[], f: (item: T) => boolean): T[];
};
//let filter: Filter<number> = (array, f) => {}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function map<T, U>(array: T[], f: (item: T) => U): U[] {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result[i] = f(array[i]);
  }
  return result;
}

map<string, boolean | string>(["a", "b", "c"], (_) => _ === "a");
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const promise = new Promise<number>((resolve) => resolve(45));
promise.then(
  (
    result // number
  ) => result * 4
);

type TreeNode = {
  value: string;
};
type LeafNode = TreeNode & {
  isLeaf: true;
};
type InnerNode = TreeNode & {
  children: [TreeNode] | [TreeNode, TreeNode];
};
function mapNode<T extends TreeNode>(node: T, f: (value: string) => string): T {
  return {
    ...node,
    value: f(node.value)
  };
}

type HasSides = { numberOfSides: number };
type SidesHaveLength = { sideLength: number };
function logPerimeter<Shape extends HasSides & SidesHaveLength>(
  s: Shape
): Shape {
  console.log(s.numberOfSides * s.sideLength);
  return s;
}
type Square = HasSides & SidesHaveLength;
const square: Square = { numberOfSides: 4, sideLength: 3 };
logPerimeter(square); // Square, logs "12"
