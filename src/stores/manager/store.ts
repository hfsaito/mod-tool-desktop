import { isArray, mergeWith } from 'lodash';

type Listener = () => void;
type DeepPartial<T> = T extends object ? {
  [P in keyof T]?: DeepPartial<T[P]>;
} : T;
type Updater<S> = DeepPartial<S> | ((prevValue: S) => DeepPartial<S>);

class StoreCounter {
  private static counter = 0;
  static getCounter = () => StoreCounter.counter++;
}

export class Store<State> {
  state: State;
  _id: number;
  _listeners: Array<Listener> = [];

  constructor(initialState: State) {
    this._id = StoreCounter.getCounter();
    this.state = initialState;
  }

  setState = (updater: Updater<State>): void => {
    let nextState: DeepPartial<State>;

    if (updater instanceof Function) {
      nextState = updater(this.state);
    } else {
      nextState = updater;
    }

    if (nextState == null) {
      return;
    }

    if (typeof nextState === 'object') {
      this.state = mergeWith(this.state, nextState, (oldValue, newValue) => {
        if (isArray(oldValue)) {
          return newValue;
        }
      });
    } else {
      this.state = nextState as State;
    }
    this._listeners.every(listener => listener());
  }

  _subscribe = (fn: Listener): void => {
    this._listeners.push(fn);
  }

  _unsubscribe = (fn: Listener): void => {
    this._listeners = this._listeners.filter(listener => listener !== fn);
  }
}
