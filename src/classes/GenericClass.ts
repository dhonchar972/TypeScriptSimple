class MyMap<K, V> {
  initialKey: K;
  initialValue: V;

  constructor(initialKey: K, initialValue: V) {
    this.initialKey = initialKey;
    this.initialValue = initialValue;
  }

  get(key: K): V {
    // ...
  }
  set(key: K, value: V): void {
    // ...
  }
  merge<K1, V1>(map: MyMap<K1, V1>): MyMap<K | K1, V | V1> {
    return; //...
  }
  static of<K, V>(k: K, v: V): MyMap<K, V> {
    return; //...
  }
}
