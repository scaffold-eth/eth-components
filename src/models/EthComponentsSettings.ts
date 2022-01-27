import { createContext } from 'react';

export interface IEthComponentsSettings {
  apiKeys: {
    BlocknativeDappId: string | undefined;
  };
}

export const defaultContextValues = (): IEthComponentsSettings => {
  return {
    apiKeys: {
      BlocknativeDappId: undefined,
    },
  };
};

export const EthComponentsSettingsContext = createContext<IEthComponentsSettings>(defaultContextValues());
export const checkBlocknativeAppId = (context: IEthComponentsSettings): void => {
  if (!context.apiKeys.BlocknativeDappId)
    throw new Error(
      '🔺 Blocknative DappId not given.  Please create EthComponentsContext provider before using eth-components'
    );
};
