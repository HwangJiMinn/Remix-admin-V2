import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { createContext, useState } from 'react';

export interface ServerStyleContextData {
  key: string
  ids: Array<string>
  css: string
}

interface ClientCacheProviderProps {
  children: React.ReactNode;
}

export const ServerStyleContext = createContext<ServerStyleContextData[] | null>(null);

export interface ClientStyleContextData {
  reset: () => void
}

export const ClientStyleContext = createContext<ClientStyleContextData | null>(null);

export const createEmotionCache = () => {
  return createCache({ key: 'cha' });
};

export const defaultCache = createEmotionCache();

export const ClientCacheProvider = ({ children }: ClientCacheProviderProps) => {
  const [cache, setCache] = useState(defaultCache);

  function reset() {
    setCache(createEmotionCache());
  }

  return (
    <ClientStyleContext.Provider value={{ reset }}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ClientStyleContext.Provider>
  );
};
