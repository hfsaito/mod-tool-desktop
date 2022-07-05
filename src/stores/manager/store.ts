type Listener = () => void;
type Updater<S> = Partial<S> | ((prevValue: S) => Partial<S>)

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
    let nextState: Partial<State>;

    if (updater instanceof Function) {
      nextState = updater(this.state);
    } else {
      nextState = updater;
    }

    if (nextState == null) {
      return;
    }

    this.state = Object.assign({}, this.state, nextState);
    this._listeners.every(listener => listener());
  }

  _subscribe = (fn: Listener): void => {
    this._listeners.push(fn);
  }

  _unsubscribe = (fn: Listener): void => {
    this._listeners = this._listeners.filter(listener => listener !== fn);
  }
}
