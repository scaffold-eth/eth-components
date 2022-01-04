import React from "react";
import useBalance from "../useEthComponent/Balance";

function Balance({ toggleMode, displayBalance, ...props }) {
  return (
    <span
      style={{
        verticalAlign: "middle",
        fontSize: props.size ? props.size : 24,
        padding: 8,
        cursor: "pointer",
      }}
      onClick={toggleMode}
    >
      {displayBalance}
    </span>
  );
}

export default useBalance(Balance);
