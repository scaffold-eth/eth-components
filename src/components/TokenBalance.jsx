import React from 'react';
import useTokenBalanceWrapper from '../useEthComponent/TokenBalance';

function TokenBalance({ toggleMode, img, displayBalance, ...props }) {
  return (
    <span
      style={{
        verticalAlign: 'middle',
        fontSize: 24,
        padding: 8,
        cursor: 'pointer',
      }}
      onClick={toggleMode}
    >
      {img} {displayBalance}
    </span>
  );
}

export default useTokenBalanceWrapper(TokenBalance);
