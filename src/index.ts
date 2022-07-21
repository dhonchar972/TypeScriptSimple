const a: number = 1 + 2;
const b: number = a + 3;
const c = {
  apple: a,
  banana: b
};
c.apple = 4;
console.log(c.apple);
