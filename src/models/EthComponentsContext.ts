import { createContext } from 'react';

export interface IEthComponentsContext {
  apiKeys: {
    BlocknativeDappId: string | undefined;
  };
}

export const defaultContextValues = (): IEthComponentsContext => {
  return {
    apiKeys: {
      BlocknativeDappId: undefined,
    },
  };
};

export const EthComponentsContext = createContext<IEthComponentsContext>(defaultContextValues());
export const checkBlocknativeAppId = (context: IEthComponentsContext): void => {
  if (!context.apiKeys.BlocknativeDappId)
    throw Error(
      'Blocknative DappId not give.  Please create EthComponentsContext provider before using eth-components'
    );
};
