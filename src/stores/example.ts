import { Store } from "./manager";

type ExampleState = {
  foo: number;
};

class ExampleStore extends Store<ExampleState> {}

export const exampleStore = new ExampleStore({ foo: 0 });
