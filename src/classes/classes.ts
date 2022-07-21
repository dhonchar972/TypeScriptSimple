class MessageQueue {
  private constructor(private messages: string[]) {} // final like class
  static create(messages: string[]) {
    return new MessageQueue(messages);
  }
}

//111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
class MySet {
  has(value: number): boolean {
    // ...
  }
  add(value: number): this {
    // ...
  }
}

type Sushi1 = {
  //alias
  calories: number;
  salty: boolean;
  tasty: boolean;
};
//111111111111111111111111111111111111111SAME111111111111111111111111111111111111111111111111111111111111111111//
interface Sushi2 {
  //interface
  calories: number;
  salty: boolean;
  tasty: boolean;
}

type Food = {
  calories: number;
  tasty: boolean;
};
type Sushi = Food & {
  salty: boolean;
};
type Cake = Food & {
  sweet: boolean;
};

interface Food2 {
  calories: number;
  tasty: boolean;
}
interface Sushi2 extends Food2 {
  salty: boolean;
}
interface Cake2 extends Food2 {
  sweet: boolean;
}

interface AAA {
  good(x: number): string;
  bad(x: number): string;
}

interface BBB extends AAA {
  good(x: string | number): string;
  bad(x: string): string; // Ошибка TS2430: Interface 'BBB' некорректно расширяет
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
type chessColor = "Black" | "White";
type chessFile = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H";
type chessRank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
class Position {
  constructor(private file: chessFile, private rank: chessRank) {}
}
class Piece {
  protected position: Position;
  constructor(
    private readonly color: chessColor,
    file: chessFile,
    rank: chessRank
  ) {
    this.position = new Position(file, rank);
  }
}
// protection level: [public, protected, private]

abstract class Piece {
  moveTo(position: Position) {
    this.position = position;
  }
  abstract canMoveTo(position: Position): boolean;
}
class Position {
  distanceFrom(position: Position) {
    return {
      rank: Math.abs(position.rank - this.rank),
      file: Math.abs(position.file.charCodeAt(0) - this.file.charCodeAt(0))
    };
  }
}
class King extends Piece {
  canMoveTo(position: Position) {
    const distance = this.position.distanceFrom(position);
    return distance.rank < 2 && distance.file < 2;
  }
}
class Game {
  private pieces = Game.makePieces();
  private static makePieces() {
    return [
      // Короли
      new King("White", "E", 1),
      new King("Black", "E", 8),
      // Ферзи
      new Queen("White", "D", 1),
      new Queen("Black", "D", 8),
      // Слоны
      new Bishop("White", "C", 1),
      new Bishop("White", "F", 1),
      new Bishop("Black", "C", 8),
      new Bishop("Black", "F", 8)
      // ...
    ];
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// type Shoe = {
//   purpose: string;
// };
// eslint-disable-next-line prefer-const
interface Shoe {
  purpose: string;
}
class BalletFlat implements Shoe {
  purpose = "dancing";
}
class Boot implements Shoe {
  purpose = "woodcutting";
}
class Sneaker implements Shoe {
  purpose = "walking";
}
// fabric method
let Shoe = {
  create(type: "balletFlat" | "boot" | "sneaker"): Shoe {
    switch (type) {
      case "balletFlat":
        return new BalletFlat();
      case "boot":
        return new Boot();
      case "sneaker":
        return new Sneaker();
    }
  }
};
