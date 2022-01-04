import { Input } from "antd";
import React from "react";
import useBytesStringInput from "../useEthComponent/BytesStringInput";

/*
  ~ What it does? ~

  Displays input field with options to convert between STRING and BYTES32

  ~ How can I use? ~

  <BytesStringInput
    autofocus
    value={"scaffold-eth"}
    placeholder="Enter value..."
    onChange={value => {
      setValue(value);
    }}
  />

  ~ Features ~

  - Provide value={value} to specify initial string
  - Provide placeholder="Enter value..." value for the input
  - Control input change by onChange={value => { setValue(value);}}

*/

const BytesStringInput = ({ value, autoFocus, placeholder, mode, toggleOption, onChange }) => {
  const option = title => {
    return (
      <div style={{ cursor: "pointer" }} onClick={toggleOption}>
        {title}
      </div>
    );
  };

  let addonAfter = option("BYTES32 🔀");
  if (mode === "STRING") {
    addonAfter = option("STRING 🔀");
  }

  return (
    <Input
      placeholder={placeholder ? placeholder : "Enter value in " + mode}
      autoFocus={autoFocus}
      value={value}
      addonAfter={addonAfter}
      onChange={onChange}
    />
  );
};

export default useBytesStringInput(BytesStringInput);
