import React, { useState } from 'react';
import Blockie from './Blockie';
import { AddressInput as useAddressInput } from '../useEthComponent';
import { CameraOutlined, QrcodeOutlined } from '@ant-design/icons';
import { Badge, Input } from 'antd';
import QrReader from 'react-qr-reader';

function AddressInput({ ens, address, shortAddress, isPossibleENS, value, onChange, ...props }) {
  const [scan, setScan] = useState(false);

  return (
    <div>
      {scan ? (
        <div
          style={{
            zIndex: 256,
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
          }}
          onClick={() => {
            setScan(false);
          }}
        >
          <QrReader
            delay={250}
            resolution={1200}
            onError={(e) => {
              console.log('SCAN ERROR', e);
              setScan(false);
            }}
            onScan={(newValue) => {
              if (newValue) {
                console.log('SCAN VALUE', newValue);
                let possibleNewValue = newValue;
                if (possibleNewValue.indexOf('/') >= 0) {
                  possibleNewValue = possibleNewValue.substr(possibleNewValue.lastIndexOf('0x'));
                  console.log('CLEANED VALUE', possibleNewValue);
                }
                setScan(false);
                onChange(possibleNewValue);
              }
            }}
            style={{ width: '100%' }}
          />
        </div>
      ) : (
        ''
      )}
      <Input
        autoComplete="off"
        autoFocus={props.autoFocus}
        placeholder={props.placeholder ? props.placeholder : 'address'}
        prefix={<Blockie address={value} size={8} scale={3} />}
        value={ens || value}
        addonAfter={
          <div
            style={{ marginTop: 4, cursor: 'pointer' }}
            onClick={() => {
              setScan(!scan);
            }}
          >
            <Badge count={<CameraOutlined style={{ fontSize: 9 }} />}>
              <QrcodeOutlined style={{ fontSize: 18 }} />
            </Badge>{' '}
            Scan
          </div>
        }
        onChange={(e) => onChange(e.target.value)}
        {...props}
      />
    </div>
  );
}

export default useAddressInput(AddressInput);
