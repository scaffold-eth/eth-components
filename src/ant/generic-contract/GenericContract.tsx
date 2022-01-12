import { Card } from 'antd';
import { TContractConfig, useContractExistsAtAddress, useContractLoader } from 'eth-hooks';
import { TEthersProvider, TProviderAndSigner } from 'eth-hooks/models';
import { Contract } from 'ethers';
import { FunctionFragment } from 'ethers/lib/utils';
import React, { FC, ReactElement, useMemo, useState } from 'react';

import { DisplayVariable } from './DisplayVariable';
import { FunctionForm } from './FunctionForm';
import { NoContractDisplay } from './NoContractDisplay';

import { Account } from '~~/ant';

const isQueryable = (fn: FunctionFragment): boolean =>
  (fn.stateMutability === 'view' || fn.stateMutability === 'pure') && fn.inputs.length === 0;

interface IGenericContract {
  currentProviderAndSigner: TProviderAndSigner | undefined;
  mainnetProvider: TEthersProvider | undefined;
  customContract?: Contract;
  account?: ReactElement;
  gasPrice?: number;
  contractName: string;
  show?: string[];
  tokenPrice?: number;
  blockExplorer: string;
  contractConfig: TContractConfig;
}

const parseProviderAndSignerForContract = (contract: Contract | undefined): TProviderAndSigner => {
  return {
    address: contract?.address,
    signer: contract?.signer,
    provider: contract?.provider as TEthersProvider,
    providerNetwork: (contract?.provider as TEthersProvider).network,
  };
};

export const GenericContract: FC<IGenericContract> = (props) => {
  const contracts = useContractLoader(
    props.currentProviderAndSigner?.provider as TEthersProvider,
    props.contractConfig,
    props.currentProviderAndSigner?.providerNetwork?.chainId
  );
  let contract: Contract | undefined = props.customContract;
  if (!props.customContract) {
    contract = contracts ? contracts[props.contractName] : undefined;
  }
  const address = contract ? contract.address : '';
  const contractIsDeployed = useContractExistsAtAddress(props.currentProviderAndSigner?.provider, address);

  const displayedContractFunctions = useMemo(
    () =>
      contract
        ? Object.values(contract.interface.functions).filter(
            (fn) => fn.type === 'function' && !(props.show && props.show.indexOf(fn.name) < 0)
          )
        : [],
    [contract, props.show]
  );

  const [refreshRequired, setTriggerRefresh] = useState(false);
  const contractDisplay = displayedContractFunctions.map((fn) => {
    if (!props.currentProviderAndSigner?.signer) return <></>;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const contractFunc =
      fn.stateMutability === 'view' || fn.stateMutability === 'pure'
        ? contract?.[fn.name]
        : contract?.connect(props.currentProviderAndSigner?.signer)?.[fn.name];

    if (typeof contractFunc === 'function') {
      if (isQueryable(fn)) {
        // If there are no inputs, just display return value
        return (
          <DisplayVariable
            key={fn.name}
            contractFunction={contract?.[fn.name]}
            functionInfo={fn}
            refreshRequired={refreshRequired}
            setTriggerRefresh={setTriggerRefresh}
          />
        );
      }
      // If there are inputs, display a form to allow users to provide these
      return (
        <FunctionForm
          key={'FF' + fn.name}
          contractFunction={contractFunc}
          functionInfo={fn}
          provider={props.currentProviderAndSigner?.provider}
          gasPrice={props.gasPrice ?? 0}
          setTriggerRefresh={setTriggerRefresh}
        />
      );
    }
    return null;
  });

  const contractProviderAndSigner: TProviderAndSigner = parseProviderAndSignerForContract(contract);

  return (
    <div style={{ margin: 'auto', width: '70vw' }}>
      <Card
        title={
          <div>
            {props.contractName}
            <div style={{ float: 'right' }}>
              <Account
                providerAndSigner={contractProviderAndSigner}
                mainnetProvider={props.mainnetProvider}
                price={props.tokenPrice ?? 0}
                blockExplorer={props.blockExplorer}
              />
              {props.account}
            </div>
          </div>
        }
        size="default"
        style={{ marginTop: 25, width: '100%' }}
        loading={contractDisplay && contractDisplay.length <= 0}>
        {contractIsDeployed ? contractDisplay : NoContractDisplay}
      </Card>
    </div>
  );
};
