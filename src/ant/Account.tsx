import { Button } from 'antd';
import { TEthersProvider, TProviderAndSigner } from 'eth-hooks/models';
import React, { FC } from 'react';
import { useThemeSwitcher } from 'react-css-theme-switcher';

import { Address, Balance, Wallet } from '.';

export interface IAccountProps {
  currentProviderAndSigner: TProviderAndSigner | undefined;
  mainnetProvider: TEthersProvider | undefined;
  price: number;
  minimized?: string;
  loadWeb3Modal?: () => void;
  logoutOfWeb3Modal?: () => void;
  blockExplorer: string;
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
  const logoutButton = (
    <>
      {props.logoutOfWeb3Modal && props.currentProviderAndSigner?.signer != null && (
        <Button
          key="logoutbutton"
          style={{ verticalAlign: 'top', marginLeft: 8, marginTop: 4 }}
          shape="round"
          size="large"
          onClick={props.logoutOfWeb3Modal}>
          logout
        </Button>
      )}
    </>
  );

  const loadModalButton = (
    <>
      {props.loadWeb3Modal && props.currentProviderAndSigner?.signer == null && (
        <Button
          key="loginbutton"
          style={{ verticalAlign: 'top', marginLeft: 8, marginTop: 4 }}
          shape="round"
          size="large"
          onClick={props.loadWeb3Modal}>
          connect
        </Button>
      )}
    </>
  );

  const { currentTheme } = useThemeSwitcher();
  const address = props.currentProviderAndSigner?.address;

  const display = props.minimized ? (
    <></>
  ) : (
    <span>
      {address != null && (
        <>
          <Address
            punkBlockie
            address={address}
            ensProvider={props.mainnetProvider}
            blockExplorer={props.blockExplorer}
          />
          <Balance address={address} provider={props.currentProviderAndSigner?.provider} price={props.price} />
          {props.mainnetProvider && (
            <Wallet
              address={address}
              signer={props.currentProviderAndSigner?.signer}
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
