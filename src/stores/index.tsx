import { type ReactNode, createContext, useMemo } from 'react';

import globalStore, { type GlobalStore } from './global-store';

interface IMobxContext {
  globalStore: GlobalStore;
}

interface IMobxWrapperProps {
  children: ReactNode;
}

export const MobxContext = createContext<IMobxContext>({ globalStore });

export default function MobxWrapper({ children }: IMobxWrapperProps): JSX.Element {
  const mobxContextValue = useMemo(() => ({ globalStore }), [globalStore]);

  return <MobxContext.Provider value={mobxContextValue}>{children}</MobxContext.Provider>;
}
