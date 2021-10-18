import { Signer } from '@ethereum-waffle/provider/node_modules/ethers';
import { Button } from 'antd';
import { useUserAddress } from 'eth-hooks';
import { CreateEthersModalConnector, useEthersContext } from 'eth-hooks/context';
import { StaticJsonRpcProvider } from 'ethers/node_modules/@ethersproject/providers';
import React, { FC, useState } from 'react';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import { useDebounce } from 'use-debounce';

import { Address, Balance, Wallet } from '.';

export interface IAccountProps {
  ensProvider: StaticJsonRpcProvider | undefined;
  localProvider?: StaticJsonRpcProvider | undefined;
  createLoginConnector?: CreateEthersModalConnector;
  /**
   * if hasContextConnect is true, it will not use this variable
   */
  signer?: Signer;
  /**
   * if hasContextConnect = false, do not use context or context connect/login/logout.  only used passed in address.  defaults={false}
   */
  hasContextConnect: boolean;
  fontSize?: number;
  blockExplorer: string;
  price: number;
}

/**
  Displays an Address, Balance, and Wallet as one Account component,
  also allows users to log in to existing accounts and log out

    ~ Features ~
  - Provide address={address} and get balance corresponding to the given address
  - Provide localProvider={localProvider} to access balance on local network
  - Provide userProvider={userProvider} to display a wallet
  - Provide mainnetProvider={mainnetProvider} and your address will be replaced by ENS name
              (ex. "0xa870" => "user.eth")
  - Provide web3Modal={web3Modal}, loadWeb3Modal={loadWeb3Modal}, logoutOfWeb3Modal={logoutOfWeb3Modal}
              to be able to log in/log out to/from existing accounts
  - Provide blockExplorer={blockExplorer}, click on address and get the link
              (ex. by default "https://etherscan.io/" or for xdai "https://blockscout.com/poa/xdai/")
 * @param props
 * @returns (FC)
 */
export const Account: FC<IAccountProps> = ({ hasContextConnect = false, ...rest }: IAccountProps) => {
  const props = { hasContextConnect, ...rest };
  const ethersContext = useEthersContext();
  const showLoadModal = !ethersContext.active;
  const [connecting, setConnecting] = useState(false);

  const [loadingButton, loadingButtonDebounce] = useDebounce(connecting, 1000, {
    maxWait: 1500,
  });

  if (loadingButton && connecting) {
    setConnecting(false);
  }

  const address = useUserAddress(props.signer);
  // if hasContextConnect = false, do not use context or context connect/login/logout.  only used passed in address
  const [resolvedAddress] = useDebounce(props.hasContextConnect ? ethersContext.account : address, 200, {
    trailing: true,
  });

  const [resolvedSigner] = useDebounce(props.hasContextConnect ? ethersContext.signer : props.signer, 200, {
    trailing: true,
  });

  const handleLoginClick = (): void => {
    if (props.createLoginConnector != null) {
      const connector = props.createLoginConnector?.();
      if (connector) {
        setConnecting(true);
        ethersContext.openModal(connector);
      } else {
        console.warn('A valid EthersModalConnector was not provided');
      }
    }
  };

  const loadModalButton = (
    <>
      {showLoadModal && props.createLoginConnector && (
        <Button
          loading={loadingButtonDebounce.isPending()}
          key="loginbutton"
          style={{ verticalAlign: 'top', marginLeft: 8, marginTop: 4 }}
          shape="round"
          size="large"
          onClick={handleLoginClick}>
          connect
        </Button>
      )}
    </>
  );

  const logoutButton = (
    <>
      {!showLoadModal && props.createLoginConnector && (
        <Button
          key="logoutbutton"
          style={{ verticalAlign: 'top', marginLeft: 8, marginTop: 4 }}
          shape="round"
          size="large"
          onClick={ethersContext.disconnectModal}>
          logout
        </Button>
      )}
    </>
  );

  const { currentTheme } = useThemeSwitcher();

  const display = (
    <span>
      {resolvedAddress != null && (
        <>
          <Address
            punkBlockie
            address={resolvedAddress}
            fontSize={props.fontSize}
            ensProvider={props.ensProvider}
            blockExplorer={props.blockExplorer}
            minimized={false}
          />
          <Balance address={resolvedAddress} price={props.price} />
          {resolvedSigner && (
            <Wallet
              signer={resolvedSigner}
              ensProvider={props.ensProvider}
              localProvider={props.localProvider}
              price={props.price}
              color={currentTheme === 'light' ? '#1890ff' : '#2caad9'}
            />
          )}
        </>
      )}
    </span>
  );

  return (
    <div>
      {display}
      {props.hasContextConnect && (
        <>
          {loadModalButton}
          {logoutButton}
        </>
      )}
    </div>
  );
};
