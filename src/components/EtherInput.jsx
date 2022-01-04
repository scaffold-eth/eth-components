import React from "react";
import { Input } from "antd";
import useEtherInput from "../useEthComponent/EtherInput";

// small change in useEffect, display currentValue if it's provided by user

/*
  ~ What it does? ~

  Displays input field for ETH/USD amount, with an option to convert between ETH and USD

  ~ How can I use? ~

  <EtherInput
    autofocus
    price={price}
    value=100
    placeholder="Enter amount"
    onChange={value => {
      setAmount(value);
    }}
  />

  ~ Features ~

  - Provide price={price} of ether and easily convert between USD and ETH
  - Provide value={value} to specify initial amount of ether
  - Provide placeholder="Enter amount" value for the input
  - Control input change by onChange={value => { setAmount(value);}}
*/

function EtherInput({ value, mode, toggleMode, onChange, price, ...props }) {
  return (
    <Input
      placeholder={props.placeholder ? props.placeholder : "amount in " + mode}
      autoFocus={props.autoFocus}
      prefix={mode === "USD" ? "$" : "Ξ"}
      value={value}
      addonAfter={
        !price ? (
          ""
        ) : (
          <div style={{ cursor: "pointer" }} onClick={toggleMode}>
            {mode === "USD" ? "USD 🔀" : "ETH 🔀"}
          </div>
        )
      }
      onChange={onChange}
    />
  );
}

export default useEtherInput(EtherInput);
