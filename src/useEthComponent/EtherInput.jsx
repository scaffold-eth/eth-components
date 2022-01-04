import { Input } from "antd";
import React, { useEffect, useState } from "react";

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

const EtherInput =
  Component =>
  ({ value: oldValue, price, onChange, ...props }) => {
    const [mode, setMode] = useState(price ? "USD" : "ETH");
    const [display, setDisplay] = useState();
    const [value, setValue] = useState();

    const currentValue = typeof oldValue !== "undefined" ? oldValue : value;

    const toggleMode = () => {
      if (mode === "USD") {
        setMode("ETH");
        setDisplay(currentValue);
      } else {
        setMode("USD");
        if (currentValue) {
          const usdValue = "" + (parseFloat(currentValue) * price).toFixed(2);
          setDisplay(usdValue);
        } else {
          setDisplay(currentValue);
        }
      }
    };

    const onChangeHandler = async e => {
      const newValue = e.target.value;
      if (mode === "USD") {
        const possibleNewValue = parseFloat(newValue);
        if (possibleNewValue) {
          const ethValue = possibleNewValue / price;
          setValue(ethValue);
          if (typeof onChange === "function") {
            onChange(ethValue);
          }
          setDisplay(newValue);
        } else {
          setDisplay(newValue);
        }
      } else {
        setValue(newValue);
        if (typeof onChange === "function") {
          onChange(newValue);
        }
        setDisplay(newValue);
      }
    };

    useEffect(() => {
      if (!currentValue) {
        setDisplay("");
      }
    }, [currentValue]);

    return (
      <Component
        value={display}
        price={price}
        mode={mode}
        toggleMode={toggleMode}
        onChange={onChangeHandler}
        {...props}
      />
    );
  };

export default EtherInput;
