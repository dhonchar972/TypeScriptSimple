try {
  const date = parse(ask());
  console.info("Date is", date.toISOString());
} catch (e) {
  if (e instanceof RangeError) {
    console.error(e.message);
  } else {
    throw e;
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function x(): T | Error1 {
  // ...
}
function y(): U | Error1 | Error2 {
  let a = x();
  if (a instanceof Error) {
    return a;
  }
  // Сделать что-нибудь с a
}
function z(): U | Error1 | Error2 | Error3 {
  let a = y();
  if (a instanceof Error) {
    return a;
  }
  // Сделать что-нибудь с a
}

let result = parse(ask()); // Либо дата, либо ошибка.
if (result instanceof InvalidDateFormatError) {
  console.error(result.message);
} else if (result instanceof DateIsInTheFutureError) {
  console.info(result.message);
} else {
  console.info("Date is", result.toISOString());
}

function parse(
  birthday: string
): Date | InvalidDateFormatError | DateIsInTheFutureError {
  let date = new Date(birthday);
  if (!isValid(date)) {
    return new InvalidDateFormatError("Enter a date in the form YYYY/MM/DD");
  }
  if (date.getTime() > Date.now()) {
    return new DateIsInTheFutureError("Are you a timelord?");
  }
  return date;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Try, Option(or Maybe), Either - не встроен в среду, ищи в npm
function parse(birthday: string): Date[] {
  let date = new Date(birthday);
  if (!isValid(date)) {
    return [];
  }
  return [date];
}
let date = parse(ask());
date.map((_) => _.toISOString()).forEach((_) => console.info("Date is", _));

///

interface Option<T> {
  flatMap<U>(f: (value: T) => Option<U>): Option<U>;
  getOrElse(value: T): T;
}
class Some<T> implements Option<T> {
  constructor(private value: T) {}
  flatMap<U>(f: (value: T) => Option<U>): Option<U> {
    return f(this.value);
  }
  getOrElse(): T {
    return this.value;
  }
}
class None implements Option<never> {
  flatMap<U>(): Option<U> {
    return this;
  }
  getOrElse<U>(value: U): U {
    return value;
  }
}

///////////////

interface Option<T> {
  flatMap<U>(f: (value: T) => None): None;
  flatMap<U>(f: (value: T) => Option<U>): Option<U>;
  getOrElse(value: T): T;
}
class Some<T> implements Option<T> {
  constructor(private value: T) {}
  flatMap<U>(f: (value: T) => None): None;
  flatMap<U>(f: (value: T) => Some<U>): Some<U>;
  flatMap<U>(f: (value: T) => Option<U>): Option<U> {
    return f(this.value);
  }
  getOrElse(): T {
    return this.value;
  }
}
class None implements Option<never> {
  flatMap(): None {
    return this;
  }
  getOrElse<U>(value: U): U {
    return value;
  }
}

//////

function Option<T>(value: null | undefined): None;
function Option<T>(value: T): Some<T>;
function Option<T>(value: T): Option<T> {
  if (value == null) {
    return new None();
  }
  return new Some(value);
}
