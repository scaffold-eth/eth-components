import React, { useEffect, useState } from 'react';
import { utils, constants } from 'ethers';

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

const BytesStringInput =
  (Component) =>
  ({ value: originalValue, onChange, ...props }) => {
    const [mode, setMode] = useState('STRING');
    const [display, setDisplay] = useState(originalValue);
    const [value, setValue] = useState(originalValue || constants.HashZero);

    // current value is the value in bytes32
    const currentValue = typeof originalValue !== 'undefined' ? originalValue : value;

    const toggleOption = () => {
      if (mode === 'STRING') {
        setMode('BYTES32');
        if (!utils.isHexString(currentValue)) {
          /* in case user enters invalid bytes32 number,
             it considers it as string and converts to bytes32 */
          const changedValue = utils.formatBytes32String(currentValue);
          setDisplay(changedValue);
        } else {
          setDisplay(currentValue);
        }
      } else {
        setMode('STRING');
        if (currentValue && utils.isHexString(currentValue)) {
          setDisplay(utils.parseBytes32String(currentValue));
        } else {
          setDisplay(currentValue);
        }
      }
    };

    useEffect(() => {
      if (!currentValue) {
        setDisplay('');
      }
    }, [currentValue]);

    const onChangeHandler = async (e) => {
      const newValue = e.target.value;
      if (mode === 'STRING') {
        // const ethValue = parseFloat(newValue) / props.price;
        // setValue(ethValue);
        if (typeof onChange === 'function') {
          onChange(utils.formatBytes32String(newValue));
        }
        setValue(utils.formatBytes32String(newValue));
        setDisplay(newValue);
      } else {
        if (typeof onChange === 'function') {
          onChange(newValue);
        }
        setValue(newValue);
        setDisplay(newValue);
      }
    };

    return <Component value={display} mode={mode} toggleOption={toggleOption} onChange={onChangeHandler} {...props} />;
  };

export default BytesStringInput;
