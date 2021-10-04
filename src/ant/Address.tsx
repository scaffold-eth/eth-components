import { Skeleton, Typography } from 'antd';
import { useEnsAddress } from 'eth-hooks/dapps';
import { TEthersProvider } from 'eth-hooks/models';
import React, { FC } from 'react';
import Blockies from 'react-blockies';
import { useThemeSwitcher } from 'react-css-theme-switcher';

import { PunkBlockie } from '.';

// changed value={address} to address={address}

const { Text, Link } = Typography;

const blockExplorerLink = (address: string, blockExplorer?: string): string =>
  `${blockExplorer || 'https://etherscan.io/'}${'address/'}${address}`;

interface IAddressProps {
  punkBlockie?: boolean;
  ensProvider?: TEthersProvider;
  blockExplorer?: string;
  address: string;
  fontSize?: number;
  minimized?: boolean;
  size?: 'short' | 'long';
  noLink?: boolean;
  hideCopy?: boolean;
  onChange?: () => void;
}

/**
 * Displays an address with a blockie image and option to copy address

  ~ Features ~
  - Provide ensProvider={mainnetProvider} and your address will be replaced by ENS name
              (ex. "0xa870" => "user.eth")
  - Provide blockExplorer={blockExplorer}, click on address and get the link
              (ex. by default "https://etherscan.io/" or for xdai "https://blockscout.com/poa/xdai/")
  - Provide fontSize={fontSize} to change the size of address text
 * @param props
 * @returns (FC)
 */
export const Address: FC<IAddressProps> = ({ punkBlockie = false, size = 'short', ...rest }) => {
  const props = { ...rest, size, punkBlockie };
  const address = props.address;
  let ens: string = '';
  const { currentTheme } = useThemeSwitcher();

  ens = useEnsAddress(props.ensProvider, address);

  if (!address) {
    return (
      <span>
        <Skeleton avatar paragraph={{ rows: 1 }} />
      </span>
    );
  }

  let displayAddress = address.substr(0, 6);

  const ensSplit = ens && ens.split('.');
  const validEnsCheck = ensSplit && ensSplit[ensSplit.length - 1] === 'eth';

  if (validEnsCheck) {
    displayAddress = ens;
  } else if (props.size === 'short') {
    displayAddress += '...' + address.substr(-4);
  } else if (props.size === 'long') {
    displayAddress = address;
  }

  const etherscanLink = blockExplorerLink(address, props.blockExplorer);
  if (props.minimized) {
    if (props.noLink) {
      return (
        <span style={{ verticalAlign: 'middle' }}>
          <span style={{ verticalAlign: 'middle', position: 'relative' }}>
            <div style={{ position: 'absolute', left: -213, top: -62 }}>
              <PunkBlockie withQr={false} address={address.toLowerCase()} scale={0.35} />
            </div>
          </span>
        </span>
      );
    }
    return (
      <span style={{ verticalAlign: 'middle' }}>
        <a
          style={{ color: currentTheme === 'light' ? '#222222' : '#ddd' }}
          target="_blank"
          href={etherscanLink}
          rel="noopener noreferrer">
          <span style={{ verticalAlign: 'middle', position: 'relative' }}>
            <div style={{ position: 'absolute', left: -213, top: -62 }}>
              <PunkBlockie withQr={false} address={address.toLowerCase()} scale={0.35} />
            </div>
          </span>
        </a>
      </span>
    );
  }

  const copyable = props.hideCopy ? undefined : { text: address };

  const text = (
    <>
      <Link
        style={{ color: currentTheme === 'light' ? '#222222' : '#ddd' }}
        editable={props.onChange ? { onChange: props.onChange } : false}
        copyable={copyable}
        href={etherscanLink}
        target="_blank">
        {displayAddress}
      </Link>
    </>
  );

  return (
    <span style={{ position: 'relative' }}>
      {props.punkBlockie ? (
        <span style={{ verticalAlign: 'middle' }}>
          <div style={{ position: 'absolute', left: -213, top: -62 }}>
            <PunkBlockie withQr={false} address={address.toLowerCase()} scale={0.4} />
          </div>
        </span>
      ) : (
        <span style={{ verticalAlign: 'middle' }}>
          <Blockies seed={address.toLowerCase()} size={8} scale={props.fontSize ? props.fontSize / 7 : 4} />
        </span>
      )}
      <span style={{ verticalAlign: 'middle', paddingLeft: 5, fontSize: props.fontSize ? props.fontSize : 28 }}>
        {text}
      </span>
    </span>
  );
};
