import { BigNumber } from '@ethersproject/bignumber';
import { Button, Col, Divider, Input, Row, Tooltip } from 'antd';
import { useEthersContext } from 'eth-hooks/context';
import { TEthersProvider } from 'eth-hooks/models';
import { ContractFunction, utils } from 'ethers';
import { FunctionFragment } from 'ethers/lib/utils';
import React, { Dispatch, ReactElement, SetStateAction, useState, FC, useContext } from 'react';
import Blockies from 'react-blockies';

import { tryToDisplay } from './displayUtils';

import { transactor } from '~~/functions';
import { EthComponentsContext } from '~~/models';

const getFunctionInputKey = (functionInfo: FunctionFragment, input: utils.ParamType, inputIndex: number): string => {
  const name = input?.name ? input.name : `input_${inputIndex}_`;
  return functionInfo.name + '_' + name + '_' + input.type;
};

interface IFunctionForm {
  contractFunction: ContractFunction;
  functionInfo: FunctionFragment;
  provider: TEthersProvider | undefined;
  gasPrice: number;
  setTriggerRefresh: Dispatch<SetStateAction<boolean>>;
}

export const FunctionForm: FC<IFunctionForm> = (props) => {
  const [form, setForm] = useState<Record<string, any>>({});
  const [txValue, setTxValue] = useState<string>('');
  const [returnValue, setReturnValue] = useState<string | ReactElement | number | BigInt | undefined>();

  const ethersContext = useEthersContext();
  const context = useContext(EthComponentsContext);

  const tx = transactor(context, ethersContext.signer, props.gasPrice);

  const inputs = props.functionInfo.inputs.map((input, inputIndex) => {
    const key = getFunctionInputKey(props.functionInfo, input, inputIndex);

    let buttons: ReactElement = <></>;
    if (input.type === 'bytes32') {
      buttons = (
        <Tooltip placement="right" title="to bytes32">
          <div
            // type="dashed"
            style={{ cursor: 'pointer' }}
            onClick={(): void => {
              if (utils.isHexString(form[key])) {
                const formUpdate = { ...form };
                formUpdate[key] = utils.parseBytes32String(form[key]);
                setForm(formUpdate);
              } else {
                const formUpdate = { ...form };
                formUpdate[key] = utils.formatBytes32String(form[key]);
                setForm(formUpdate);
              }
            }}>
            #️⃣
          </div>
        </Tooltip>
      );
    } else if (input.type === 'bytes') {
      buttons = (
        <Tooltip placement="right" title="to hex">
          <div
            // type="dashed"
            style={{ cursor: 'pointer' }}
            onClick={(): void => {
              if (utils.isHexString(form[key])) {
                const formUpdate = { ...form };
                formUpdate[key] = utils.toUtf8String(form[key]);
                setForm(formUpdate);
              } else {
                const formUpdate = { ...form };
                formUpdate[key] = utils.hexlify(utils.toUtf8Bytes(form[key]));
                setForm(formUpdate);
              }
            }}>
            #️⃣
          </div>
        </Tooltip>
      );
    } else if (input.type === 'uint256') {
      buttons = (
        <Tooltip placement="right" title="* 10 ** 18">
          <div
            // type="dashed"
            style={{ cursor: 'pointer' }}
            onClick={(): void => {
              const formUpdate = { ...form };
              formUpdate[key] = utils.parseEther(form[key]);
              setForm(formUpdate);
            }}>
            ✴️
          </div>
        </Tooltip>
      );
    } else if (input.type === 'address') {
      const possibleAddress = form[key] && form[key].toLowerCase && form[key].toLowerCase().trim();
      if (possibleAddress && possibleAddress.length === 42) {
        buttons = (
          <Tooltip placement="right" title="blockie">
            <Blockies seed={possibleAddress} scale={3} />
          </Tooltip>
        );
      }
    }

    return (
      <div style={{ margin: 2 }} key={key}>
        <Input
          size="large"
          placeholder={input.name ? input.type + ' ' + input.name : input.type}
          autoComplete="off"
          value={form[key]}
          name={key}
          onChange={(event): void => {
            const formUpdate = { ...form };
            formUpdate[event.target.name] = event.target.value;
            setForm(formUpdate);
          }}
          suffix={buttons}
        />
      </div>
    );
  });

  const txValueInput = (
    <div style={{ margin: 2 }} key="txValueInput">
      <Input
        placeholder="transaction value"
        onChange={(e): void => setTxValue(e.target.value)}
        value={txValue}
        addonAfter={
          <div>
            <Row>
              <Col span={16}>
                <Tooltip placement="right" title=" * 10^18 ">
                  <div
                    // type="dashed"
                    style={{ cursor: 'pointer' }}
                    onClick={(): void => {
                      const floatValue = parseFloat(txValue);
                      if (floatValue) setTxValue(`${floatValue * 10 ** 18}`);
                    }}>
                    ✳️
                  </div>
                </Tooltip>
              </Col>
              <Col span={16}>
                <Tooltip placement="right" title="number to hex">
                  <div
                    // type="dashed"
                    style={{ cursor: 'pointer' }}
                    onClick={(): void => {
                      setTxValue(BigNumber.from(txValue).toHexString());
                    }}>
                    #️⃣
                  </div>
                </Tooltip>
              </Col>
            </Row>
          </div>
        }
      />
    </div>
  );

  if (props.functionInfo.payable) {
    inputs.push(txValueInput);
  }

  const buttonIcon =
    props.functionInfo.type === 'call' ? (
      <Button style={{ marginLeft: -32 }}>Read📡</Button>
    ) : (
      <Button style={{ marginLeft: -32 }}>Send💸</Button>
    );

  inputs.push(
    <div style={{ cursor: 'pointer', margin: 2 }} key="goButton">
      <Input
        onChange={(e): void => setReturnValue(e.target.value)}
        defaultValue=""
        bordered={false}
        disabled
        value={returnValue as any}
        suffix={
          <div
            style={{ width: 50, height: 30, margin: 0 }}
            // type="default"
            onClick={async (): Promise<any> => {
              const args = props.functionInfo.inputs.map((input, inputIndex) => {
                const key = getFunctionInputKey(props.functionInfo, input, inputIndex);
                let value = form[key];
                if (input.baseType === 'array') {
                  value = JSON.parse(value);
                } else if (input.type === 'bool') {
                  if (value === 'true' || value === '1' || value === '0x1' || value === '0x01' || value === '0x0001') {
                    value = 1;
                  } else {
                    value = 0;
                  }
                }
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return value;
              });

              let result: string | ReactElement | number | BigInt | undefined = undefined;
              if (props.functionInfo.stateMutability === 'view' || props.functionInfo.stateMutability === 'pure') {
                try {
                  const returned = await props.contractFunction(...args);
                  result = tryToDisplay(returned);
                } catch (err) {
                  console.error(err);
                }
              } else {
                const overrides: Record<string, any> = {};
                if (txValue) {
                  overrides.value = txValue; // ethers.utils.parseEther()
                }
                if (props.gasPrice) {
                  overrides.gasPrice = props.gasPrice;
                }
                // Uncomment this if you want to skip the gas estimation for each transaction
                // overrides.gasLimit = hexlify(1200000);

                // console.log("Running with extras",extras)
                if (tx) {
                  const returned = await tx(props.contractFunction(...args, overrides));
                  result = tryToDisplay(returned);
                }
              }

              console.log('SETTING RESULT:', result);
              setReturnValue(result);
              props.setTriggerRefresh(true);
            }}>
            {buttonIcon}
          </div>
        }
      />
    </div>
  );

  return (
    <div>
      <Row>
        <Col
          span={8}
          style={{
            textAlign: 'right',
            opacity: 0.333,
            paddingRight: 6,
            fontSize: 24,
          }}>
          {props.functionInfo.name}
        </Col>
        <Col span={16}>{inputs}</Col>
      </Row>
      <Divider />
    </div>
  );
};
