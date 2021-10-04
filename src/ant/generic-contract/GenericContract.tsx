import { Card, Typography } from 'antd';
import { TContractConfig, useContractExistsAtAddress, useContractLoader } from 'eth-hooks';
import { TEthersProvider, TEthersUser } from 'eth-hooks/models';
import { Contract } from 'ethers';
import { FunctionFragment } from 'ethers/lib/utils';
import React, { FC, ReactElement, useMemo, useState } from 'react';

import { DisplayVariable } from './DisplayVariable';
import { FunctionForm } from './FunctionFrom';
import { NoContractDisplay } from './NoContractDisplay';

const { Text } = Typography;

import { Account } from '~~/ant';

const isQueryable = (fn: FunctionFragment): boolean =>
  (fn.stateMutability === 'view' || fn.stateMutability === 'pure') && fn.inputs.length === 0;

interface IGenericContract {
  currentEthersUser: TEthersUser;
  mainnetProvider: TEthersProvider | undefined;
  customContract?: Contract;
  account?: ReactElement;
  gasPrice?: number;
  contractName: string;
  show?: string[];
  tokenPrice?: number;
  blockExplorer: string;
  contractConfig: TContractConfig;
  providerKey?: string;
}

const parseProviderAndSignerForContract = (contract: Contract | undefined): TEthersUser => {
  return {
    address: contract?.address,
    signer: contract?.signer,
    provider: contract?.provider as TEthersProvider,
    providerNetwork: (contract?.provider as TEthersProvider)?.network,
  };
};

export const GenericContract: FC<IGenericContract> = (props) => {
  const contracts = useContractLoader(props.contractConfig, props.currentEthersUser.signer, props.providerKey);
  let contract: Contract | undefined = props.customContract;
  if (!props.customContract) {
    contract = contracts ? contracts[props.contractName] : undefined;
  }
  const contractIsDeployed = useContractExistsAtAddress(contract?.address, props.providerKey);

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
    if (!props.currentEthersUser.signer) return <></>;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const contractFunc =
      fn.stateMutability === 'view' || fn.stateMutability === 'pure'
        ? contract?.[fn.name]
        : contract?.connect(props.currentEthersUser.signer)?.[fn.name];

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
          provider={props.currentEthersUser.provider}
          gasPrice={props.gasPrice ?? 0}
          setTriggerRefresh={setTriggerRefresh}
        />
      );
    }
    return null;
  });

  const contractEthersUser: TEthersUser = parseProviderAndSignerForContract(contract);
  const fontSize = 24;

  return (
    <div style={{ margin: 'auto', width: '70vw' }}>
      <Card
        title={
          <div>
            <Text style={{ fontSize: fontSize, verticalAlign: 'middle' }}>{props.contractName}</Text>
            <div style={{ float: 'right' }}>
              <Account
                currentEthersUser={contractEthersUser}
                isWeb3ModalUser={false}
                mainnetProvider={props.mainnetProvider}
                price={props.tokenPrice ?? 0}
                blockExplorer={props.blockExplorer}
                fontSize={fontSize}
              />
              {props.account}
            </div>
          </div>
        }
        size="default"
        style={{ marginTop: 25, width: '100%' }}
        loading={contractDisplay && contractDisplay.length <= 0}>
        {contractIsDeployed ? (
          contractDisplay
        ) : (
          <NoContractDisplay
            showLoading={props.currentEthersUser.signer == null || props.contractConfig?.deployedContracts == null}
          />
        )}
      </Card>
    </div>
  );
};
