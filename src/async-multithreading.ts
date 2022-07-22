setTimeout(() => console.info("A"), 1);
setTimeout(() => console.info("B"), 2);
console.info("C");

function readFile(
  path: string,
  options: { encoding: string; flag?: string },
  callback: (err: Error | null, data: string | null) => void
): void;

////////////////////////////
//callbacks
import * as fs from "fs";
// Считывание данных из журнала доступа сервера Apache.
fs.readFile(
  "/var/log/apache2/access_log",
  { encoding: "utf8" },
  (error, data) => {
    if (error) {
      console.error("error reading!", error);
      return;
    }
    console.info("success reading!", data);
  }
);
// Параллельное записывание данных в тот же журнал доступа.
fs.appendFile(
  "/var/log/apache2/access_log",
  "New access log entry",
  (error) => {
    if (error) {
      console.error("error writing!", error);
    }
  }
);

// callback hall!!!!!!!!!!
async1((err1, res1) => {
  if (res1) {
    async2(res1, (err2, res2) => {
      if (res2) {
        async3(res2, (err3, res3) => {
          // ...
        });
      }
    });
  }
});

// alternative promises and futures !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function appendAndReadPromise(path: string, data: string): Promise<string> {
  return appendPromise(path, data)
    .then(() => readPromise(path))
    .catch((error) => console.error(error));
}

/// AND CALLBACK VERSION ///
function appendAndRead(
  path: string,
  data: string,
  cb: (error: Error | null, result: string | null) => void
) {
  appendFile(path, data, (error) => {
    if (error) {
      return cb(error, null);
    }
    readFile(path, (error, result) => {
      if (error) {
        return cb(error, null);
      }
      cb(null, result);
    });
  });
}
///BRRRRRRRRRRR//

///TYPICAL PROMISE REALIZATION
type Executor = (resolve: Function, reject: Function) => void;
class Promise {
  constructor(f: Executor) {}
}
///SAME///
// class Promise {
//   constructor(resolve: Function, reject: Function){}
// }

///

import { readFile } from "fs";

function readFilePromise(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    readFile(path, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

//////////////
//MORE SAFE TYPE(Function EXCLUDED)
type Executor<T, E extends Error> = (
  resolve: (result: T) => void,
  reject: (error: E) => void
) => void;

class Promise<T, E extends Error> {
  constructor(f: Executor<T, E>) {}
  then<U, F extends Error>(g: (result: T) => Promise<U, F>): Promise<U, F>;
  catch<U, F extends Error>(g: (error: E) => Promise<U, F>): Promise<U, F>;
}

let a: () => Promise<string, TypeError> = ;// ...
let b: (s: string) => Promise<number, never> = ;// ...
let c: () => Promise<boolean, RangeError> = ;// ...

a()
  .then(b)
  .catch((e) => c()) // b не будет ошибкой, так что это случай ошибки a
  .then((result) => console.info("Done", result))
  .catch((e) => console.error("Error", e));

////

type Executor<T> = (
  resolve: (result: T) => void,
  reject: (error: unknown) => void
) => void;
class Promise<T> {
  constructor(f: Executor<T>) {}
  then<U>(g: (result: T) => Promise<U>): Promise<U> {
    // ...
  }
  catch<U>(g: (error: unknown) => Promise<U>): Promise<U> {
    // ...
  }
}

/////////////////////////////////////////syntax sugar - ASYNC/AWAIT//////////////////////////////////////////////

async function getUser() {
  try {
    let user = await getUserID(18);
    let location = await getLocation(user);
    console.info("got location", user);
  } catch (error) {
    console.error(error);
  } finally {
    console.info("done getting location");
  }
}

//RxJS - реактивная библиотека входящая по умолчанию в состав Angular(как и TypeScript)!!!!!!!!!!!!!!!!!!!!!!!!!!

//Отправители событий — это популярный паттерн проектирования в JavaScript
interface Emitter {
  // Отправка события
  emit(channel: string, value: unknown): void;
  // Сделать что-либо после отправки события, используют DOM, JQuery или NodeJS...
  on(channel: string, f: (value: unknown) => void): void;
}

import Redis from "redis";
// Создание нового экземпляра клиента Redis
let client = redis.createClient();
// Прослушивание новых событий, отправленных клиентом
client.on("ready", () => console.info("Client is ready"));
client.on("error", (e) => console.error("An error occurred!", e));
client.on("reconnecting", (params) => console.info("Reconnecting...", params));

///BROWSER WORKERS
// MainThread.ts
let worker = new Worker("WorkerScript.js");
worker.onmessage = (e) => {
  console.log(e.data); // Выводит в консоль 'Подтверждаю получение:"неких данных"'
};
worker.postMessage("some data");

// WorkerScript.ts
onmessage = (e) => {
  console.log(e.data); // Выводит в консоль 'некие данные'
  postMessage(Ack: "${e.data}");
};

////
type Matrix = number[][];
type MatrixProtocol = {
  determinant: {
    in: [Matrix];
    out: number;
  };
  "dot-product": {
    in: [Matrix, Matrix];
    out: Matrix;
  };
  invert: {
    in: [Matrix];
    out: Matrix;
  };
};

type Protocol = {
  [command: string]: {
    in: unknown[];
    out: unknown;
  };
};
function createProtocol<P extends Protocol>(script: string) {
  return <K extends keyof P>(command: K) =>
    (...args: P[K]["in"]) =>
      new Promise<P[K]["out"]>((resolve, reject) => {
        let worker = new worker(script);
        worker.onerror = reject;
        worker.onmessage = (event) => resolve(event.data.data);
        worker.postMessage({ command, args });
      });
}
