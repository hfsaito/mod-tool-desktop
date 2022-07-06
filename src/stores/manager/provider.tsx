import * as React from "react";

import { StoreContext } from "./context";
import { Store } from './store';

type StoreProviderProps = {
  stores: Store<unknown>[]
};

export const StoreProvider: React.FC<StoreProviderProps> = props => {
  return (
    <StoreContext.Consumer>
      {parentMap  => {
        const childMap = new Map(parentMap);

        if (props.stores) {
          props.stores.forEach(store => {
            childMap.set(store._id, store);
          });
        }

        return (
          <StoreContext.Provider value={childMap}>
            {props.children}
          </StoreContext.Provider>
        );
      }}
    </StoreContext.Consumer>
  );
};
