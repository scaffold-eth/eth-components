import { Button } from 'antd';
import { CreateEthersModalConnector, useEthersContext } from 'eth-hooks/context';
import { StaticJsonRpcProvider } from 'ethers/node_modules/@ethersproject/providers';
import React, { FC, useState } from 'react';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import { useDebounce } from 'use-debounce';

import { Address, Balance, Wallet } from '.';

export interface IAccountProps {
  mainnetProvider: StaticJsonRpcProvider | undefined;
  localProvider?: StaticJsonRpcProvider | undefined;
  createLoginConnector?: CreateEthersModalConnector;
  account?: string;
  minimized?: boolean;
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
export const Account: FC<IAccountProps> = (props: IAccountProps) => {
  const ethersContext = useEthersContext();
  const showConnect = !ethersContext.active;
  const [connecting, setConnecting] = useState(false);

  const [loadingButton, loadingButtonDebounce] = useDebounce(connecting, 1000, {
    maxWait: 1500,
  });

  if (loadingButton && connecting) {
    setConnecting(false);
  }

  const [address] = useDebounce(props.account ?? ethersContext.account, 200, {
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
      {showConnect && props.createLoginConnector && (
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
      {!showConnect && props.createLoginConnector && (
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

  const display = props.minimized ? (
    <></>
  ) : (
    <span>
      {address != null && (
        <>
          <Address
            punkBlockie
            address={address}
            fontSize={props.fontSize}
            ensProvider={props.mainnetProvider}
            blockExplorer={props.blockExplorer}
            minimized={props.minimized}
          />
          <Balance address={address} price={props.price} />
          {props.mainnetProvider && (
            <Wallet
              address={address}
              signer={ethersContext?.signer}
              ensProvider={props.mainnetProvider}
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
      {loadModalButton}
      {logoutButton}
    </div>
  );
};
