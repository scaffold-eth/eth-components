import React from 'react';
import { useLookupAddress } from 'eth-hooks/dapps/ens';

// changed value={address} to address={address}

/*
  ~ What it does? ~

  Displays an address with a blockie image and option to copy address

  ~ How can I use? ~

  <Address
    address={address}
    ensProvider={mainnetProvider}
    blockExplorer={blockExplorer}
    fontSize={fontSize}
  />

  ~ Features ~

  - Provide ensProvider={mainnetProvider} and your address will be replaced by ENS name
              (ex. "0xa870" => "user.eth")
  - Provide blockExplorer={blockExplorer}, click on address and get the link
              (ex. by default "https://etherscan.io/" or for xdai "https://blockscout.com/poa/xdai/")
  - Provide fontSize={fontSize} to change the size of address text
*/

const blockExplorerLink = (address, blockExplorer) => `${blockExplorer || 'https://etherscan.io/'}address/${address}`;

const Address = (Component) => (props) => {
  const address = props.value || props.address;
  let ens = useLookupAddress(props.ensProvider, address);
  ens = ens.toLowerCase() !== address.toLowerCase() ? ens : '';
  const explorerLink = blockExplorerLink(address, props.blockExplorer);

  const shortAddress = address ? `${address.substr(0, 5)}...${address.substr(-4)}` : '';

  return <Component ens={ens} address={address} shortAddress={shortAddress} explorerLink={explorerLink} />;
};

export default Address;
