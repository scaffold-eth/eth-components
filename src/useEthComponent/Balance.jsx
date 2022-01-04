import React, { useState } from 'react';
import { useBalance } from 'eth-hooks';

import { utils } from 'ethers';

/*
  ~ What it does? ~

  Displays a balance of given address in ether & dollar

  ~ How can I use? ~

  <Balance
    address={address}
    provider={mainnetProvider}
    price={price}
  />

  ~ If you already have the balance as a bignumber ~
  <Balance
    balance={balance}
    price={price}
  />

  ~ Features ~

  - Provide address={address} and get balance corresponding to given address
  - Provide provider={mainnetProvider} to access balance on mainnet or any other network (ex. localProvider)
  - Provide price={price} of ether and get your balance converted to dollars
*/

const Balance =
  (Component) =>
  ({ address, value, balance: propsBalance, provider, price: propsPrice, dollarMultiplier, ...props }) => {
    const [dollarMode, setDollarMode] = useState(true);

    const balance = useBalance(provider, address);
    let floatBalance = parseFloat('0.00');
    let usingBalance = balance;

    if (typeof propsBalance !== 'undefined') usingBalance = propsBalance;
    if (typeof value !== 'undefined') usingBalance = value;

    if (usingBalance) {
      const etherBalance = utils.formatEther(usingBalance);
      parseFloat(etherBalance).toFixed(2);
      floatBalance = parseFloat(etherBalance);
    }

    let displayBalance = floatBalance.toFixed(4);

    const price = propsPrice || dollarMultiplier || 1;

    if (dollarMode) {
      displayBalance = '$' + (floatBalance * price).toFixed(2);
    }

    const toggleMode = () => {
      setDollarMode(!dollarMode);
    };

    return <Component toggleMode={toggleMode} displayBalance={displayBalance} {...props} />;
  };

export default Balance;
