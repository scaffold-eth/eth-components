import { useTokenBalance } from "eth-hooks/erc/erc-20/useTokenBalance";
import React, { useState } from "react";

import { utils } from "ethers";

const TokenBalance =
  Component =>
  ({ contract, name, address, balance: propsBalance, dollarMultiplier, img, ...props }) => {
    const [dollarMode, setDollarMode] = useState(true);

    const tokenContract = contracts && contracts[name];
    const balance = useTokenBalance(tokenContract, address, 1777);

    let floatBalance = parseFloat("0.00");

    let usingBalance = balance;

    if (typeof propsBalance !== "undefined") {
      usingBalance = propsBalance;
    }

    if (usingBalance) {
      const etherBalance = utils.formatEther(usingBalance);
      parseFloat(etherBalance).toFixed(2);
      floatBalance = parseFloat(etherBalance);
    }

    let displayBalance = floatBalance.toFixed(4);

    if (dollarMultiplier && dollarMode) {
      displayBalance = "$" + (floatBalance * dollarMultiplier).toFixed(2);
    }

    return (
      <Component
        toggleMode={() => {
          setDollarMode(!dollarMode);
        }}
        img={img}
        displayBalance={displayBalance}
        {...props}
      />
    );
  };

export default TokenBalance;
