import { formatEther } from '@ethersproject/units';
import { useBalance } from 'eth-hooks';
import { BigNumber } from 'ethers';
import React, { FC, useState } from 'react';

interface IBalanceProps {
  address: string | undefined;
  price?: number;
  balance?: BigNumber;
  dollarMultiplier?: number;
  size?: 'short' | 'long';
}

/**
 * Displays a balance of given address in ether & dollar
 *
  ~ Features ~

  - Provide address={address} and get balance corresponding to given address
  - Provide provider={mainnetProvider} to access balance on mainnet or any other network (ex. localProvider)
  - Provide price={price} of ether and get your balance converted to dollars
 * @param props
 * @returns (FC)
 */
export const Balance: FC<IBalanceProps> = (props) => {
  const [dollarMode, setDollarMode] = useState(true);
  const [balance] = useBalance(props.address);

  let resolvedBalance = BigNumber.from(balance ?? 0);
  if (props.balance != null) {
    resolvedBalance = BigNumber.from(props.balance);
  }

  let floatBalance = parseFloat('0.00');
  if (resolvedBalance) {
    const etherBalance = formatEther(resolvedBalance);
    floatBalance = parseFloat(etherBalance);
  }

  let display = floatBalance.toFixed(4);
  const price = props.price ?? props.dollarMultiplier;
  if (price && dollarMode) {
    display = '$' + (floatBalance * price).toFixed(2);
  }

  return (
    <span
      style={{
        verticalAlign: 'middle',
        fontSize: props.size ?? 24,
        padding: 8,
        cursor: 'pointer',
      }}
      onClick={(): void => {
        setDollarMode(!dollarMode);
      }}>
      {display}
    </span>
  );
};
