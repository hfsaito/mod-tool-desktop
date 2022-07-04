import * as React from 'react';

import { StoreContext } from './context';
import { Store } from './store';


export const useStore = <State = unknown>(s: Store<State>): Store<State> => {
  const map = React.useContext(StoreContext);

  const [, setDummy] = React.useState<void>();
  
  const store = React.useMemo(() => {
    const storeFound = map.get(s._id);
    if (typeof storeFound === 'undefined') {
      throw 'Undefined store, forgot to inject the store using Provider';
    }
    return storeFound;
  }, [s]);

  React.useEffect(() => {
    store._subscribe(setDummy);
    return () => store._unsubscribe(setDummy);
  }, []);

  return store;
};
