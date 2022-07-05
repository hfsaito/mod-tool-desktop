import * as React from 'react';

import { StoreContext } from './context';
import { Store } from './store';


export const useStore = <State = unknown>(s: Store<State>): void => {
  const map = React.useContext(StoreContext);

  const [, updateState] = React.useState<{}>();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  
  const store = React.useMemo(() => {
    const storeFound = map.get(s._id);
    if (typeof storeFound === 'undefined') {
      throw 'Undefined store, forgot to inject the store using Provider';
    }
    return storeFound;
  }, []);

  React.useEffect(() => {
    store._subscribe(forceUpdate);
    return () => store._unsubscribe(forceUpdate);
  }, []);
};
