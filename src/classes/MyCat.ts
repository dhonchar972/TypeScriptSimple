// protection level: [public, protected, private]
interface MyAnimal {
  //readonly name: string;// only public fields

  eat(food: string): void;

  sleep(hours: number): void;
}

interface Feline {
  meow(): void;
}

class MyCat implements MyAnimal, Feline {
  private _name: string;

  constructor(name: string) {
    //super(...args)
    this._name = name ?? "tvarina";

    // if (typeof name === "boolean") {
    //   this._name = name;
    // } else {
    //   this._name = "tvarina";
    // }
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  meow(): void {
    console.info("MEOW!!!");
  }

  eat(food: string) {
    console.info("Ate some", food, ". Mmm!");
  }

  sleep(hours: number) {
    console.info("Slept for", hours, "hours");
  }
}
//111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111

const aboba = new MyCat("dfsfs");
console.log(aboba.name);
