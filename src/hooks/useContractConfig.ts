import { TContractConfig } from 'eth-hooks/models';
import { useState, useEffect } from 'react';

/**
 *
 * @param loadAppContracts
 * @returns
 */
export const useContractConfig = (loadAppContracts: () => Promise<TContractConfig>): TContractConfig => {
  const [contractsConfig, setContractsConfig] = useState<TContractConfig>({});

  useEffect((): void => {
    const loadFunc = async (): Promise<void> => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const result = await loadAppContracts();
      setContractsConfig(result);
    };
    void loadFunc();
  }, []);
  return contractsConfig;
};
