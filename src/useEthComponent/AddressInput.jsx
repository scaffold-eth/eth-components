import { CameraOutlined, QrcodeOutlined } from '@ant-design/icons';
import { Badge, Input } from 'antd';
import { useLookupAddress } from 'eth-hooks/dapps/ens';
import React, { useEffect, useState } from 'react';
// import useClipboard from "react-use-clipboard";
import QrReader from 'react-qr-reader';
import { ethers } from 'ethers';

// probably we need to change value={toAddress} to address={toAddress}

/*
  ~ What it does? ~

  Displays an address input with QR scan option

  ~ How can I use? ~

  <AddressInput
    autoFocus
    ensProvider={mainnetProvider}
    placeholder="Enter address"
    value={toAddress}
    onChange={setToAddress}
  />

  ~ Features ~

  - Provide ensProvider={mainnetProvider} and your address will be replaced by ENS name
              (ex. "0xa870" => "user.eth") or you can enter directly ENS name instead of address
  - Provide placeholder="Enter address" value for the input
  - Value of the address input is stored in value={toAddress}
  - Control input change by onChange={setToAddress}
                          or onChange={address => { setToAddress(address);}}
*/

const possibleENS = (address = '') => !ethers.utils.isAddress(address) && address.indexOf('.') > -1;

const AddressInput =
  (Component) =>
  ({ ensProvider, onChange, value: propsValue, ...props }) => {
    const [value, setValue] = useState(propsValue || '');
    const [address, setAddress] = useState('');
    const [ens, setEns] = useState('');
    const isPossibleENS = possibleENS(value);
    // const [scan, setScan] = useState(false);

    const inputProps = {
      name: '0xaddress',
      id: '0xaddress',
    };

    const shortAddress = address ? `${address.substr(0, 5)}...${address.substr(-4)}` : '';

    const ensLookupValue = useLookupAddress(ensProvider, value) || '';

    useEffect(() => {
      setEns(ensLookupValue);
    }, [ensLookupValue]);

    const updateAddress = async (newValue) => {
      setValue(newValue);
      let possibleAddress = address;
      if (typeof newValue !== 'undefined') {
        let isENS = false;
        let isAddress = false;
        if (possibleENS(newValue)) {
          console.log(`Is possible ENS, resolving...`);
          try {
            possibleAddress = await ensProvider.resolveName(newValue);
            console.log(`Possible address`, possibleAddress);
            if (possibleAddress) {
              setEns(newValue);
              setAddress(possibleAddress);
              isENS = true;
            } else {
              throw new Error('no possible address');
            }
          } catch (e) {
            setEns('');
          }
        }

        if (ethers.utils.isAddress(newValue)) {
          // try reverse resolve address -> ENS here
          isAddress = true;
          try {
            const possibleENS = await ensProvider.lookupAddress(newValue);
            if (possibleENS && possibleENS.length > 1) {
              possibleAddress = newValue;
              setAddress(newValue);
              setEns(possibleENS);
            } else {
              throw new Error('no possible ENS');
            }
          } catch (e) {
            setAddress('');
          }
        }

        if (!isENS && !isAddress) {
          setAddress('');
          setEns('');
        }
      }

      // send value up through onChange props
      if (typeof onChange === 'function') {
        onChange(possibleAddress || newValue);
      }
    };

    return (
      <Component
        ens={ens}
        address={address}
        value={value}
        isPossibleENS={isPossibleENS}
        onChange={updateAddress}
        shortAddress={shortAddress}
        {...inputProps}
        {...props}
      />
    );
  };

export default AddressInput;
