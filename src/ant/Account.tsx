import { Button } from 'antd';
import { EthersModalConnector, useEthersContext } from 'eth-hooks/context';
import { TEthersProvider } from 'eth-hooks/models';
import React, { FC } from 'react';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import { useDebounce } from 'use-debounce';

import { Address, Balance, Wallet } from '.';

export interface IAccountProps {
  mainnetProvider: TEthersProvider | undefined;
  modalConnector?: EthersModalConnector;
  price: number;
  minimized?: boolean;
  isWeb3ModalUser: boolean;
  fontSize?: number;
  blockExplorer: string;
  providerKey?: string;
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
  - Provide price={price} of ether and get your balance converted to dollars
  - Provide web3Modal={web3Modal}, loadWeb3Modal={loadWeb3Modal}, logoutOfWeb3Modal={logoutOfWeb3Modal}
              to be able to log in/log out to/from existing accounts
  - Provide blockExplorer={blockExplorer}, click on address and get the link
              (ex. by default "https://etherscan.io/" or for xdai "https://blockscout.com/poa/xdai/")
 * @param props
 * @returns (FC)
 */
export const Account: FC<IAccountProps> = (props: IAccountProps) => {
  const ethersContext = useEthersContext(props.providerKey);
  const showLogin = !props.isWeb3ModalUser || ethersContext?.signer == null;

  const logoutButton = (
    <>
      {!showLogin && (
        <Button
          key="logoutbutton"
          style={{ verticalAlign: 'top', marginLeft: 8, marginTop: 4 }}
          shape="round"
          size="large"
          onClick={ethersContext.logoutWeb3Modal}>
          logout
        </Button>
      )}
    </>
  );

  const loadModalButton = (
    <>
      {showLogin && props.modalConnector && (
        <Button
          key="loginbutton"
          style={{ verticalAlign: 'top', marginLeft: 8, marginTop: 4 }}
          shape="round"
          size="large"
          onClick={(): void => ethersContext.openWeb3Modal(props.modalConnector!)}>
          connect
        </Button>
      )}
    </>
  );

  const { currentTheme } = useThemeSwitcher();
  const [address] = useDebounce(ethersContext?.account, 100, { trailing: true });

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
          <Balance address={address} price={props.price} providerKey={props.providerKey} />
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
