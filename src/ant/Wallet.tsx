/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { KeyOutlined, QrcodeOutlined, SendOutlined, WalletOutlined } from '@ant-design/icons';
import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { parseEther } from '@ethersproject/units';
import { Button, Modal, Spin, Tooltip, Typography } from 'antd';
import { useBurnerSigner, useUserAddress } from 'eth-hooks';
import { TEthersSigner } from 'eth-hooks/models';
import { BytesLike } from 'ethers';
import QR from 'qrcode.react';
import React, { FC, useContext, useState } from 'react';

import { Address, AddressInput, Balance, EtherInput } from '.';

import { transactor } from '~~/functions';
import { EthComponentsContext } from '~~/models';

const { Text, Paragraph } = Typography;

interface IWalletProps {
  signer: TEthersSigner | undefined;
  ensProvider: StaticJsonRpcProvider | undefined;
  localProvider: StaticJsonRpcProvider | undefined;
  price: number;
  color: string;
}

/**
 *   Displays a wallet where you can specify address and send USD/ETH, with options to
  scan address, to convert between USD and ETH, to see and generate private keys,
  to send, receive and extract the burner wallet
  ~ Features ~

  - Provide provider={userProvider} to display a wallet
  - Provide address={address} if you want to specify address, otherwise
                                                    your default address will be used
  - Provide ensProvider={mainnetProvider} and your address will be replaced by ENS name
              (ex. "0xa870" => "user.eth") or you can enter directly ENS name instead of address
  - Provide price={price} of ether and easily convert between USD and ETH
  - Provide color to specify the color of wallet icon
 * @param props 
 * @returns (FC)
 */
export const Wallet: FC<IWalletProps> = (props: IWalletProps) => {
  const burner = useBurnerSigner(props.localProvider);

  const account = useUserAddress(props.signer);

  const [open, setOpen] = useState(false);
  const [qr, setQr] = useState<string>();
  const [amount, setAmount] = useState<string>('');
  const [toAddress, setToAddress] = useState<string>('');
  const [publicKey, setPublicKey] = useState<BytesLike>();

  const context = useContext(EthComponentsContext);

  const providerSend = props.signer ? (
    <Tooltip title="Wallet">
      <WalletOutlined
        onClick={(): void => {
          setOpen(!open);
        }}
        rotate={-90}
        style={{
          padding: 7,
          color: props.color ? props.color : '',
          cursor: 'pointer',
          fontSize: 28,
          verticalAlign: 'middle',
        }}
      />
    </Tooltip>
  ) : (
    <></>
  );

  let display;
  let receiveButton;
  let privateKeyButton;
  if (qr) {
    display = (
      <div>
        <div>
          <Text copyable>{account}</Text>
        </div>
        <QR
          value={account ?? ''}
          size={450}
          level="H"
          includeMargin
          renderAs="svg"
          imageSettings={{ excavate: false, src: 'copy' }}
        />
      </div>
    );
    receiveButton = (
      <Button
        key="hide"
        onClick={(): void => {
          setQr('');
        }}>
        <QrcodeOutlined /> Hide
      </Button>
    );
    privateKeyButton = (
      <Button
        key="hide"
        onClick={(): void => {
          setPublicKey(account);
          setQr('');
        }}>
        <KeyOutlined /> Private Key
      </Button>
    );
  } else if (publicKey) {
    if (props.signer == null || account == null) {
      display = (
        <div>
          <b>*initalizing*</b>
        </div>
      );
    }
    if (burner.account == null) {
      display = (
        <div>
          <b>*unknown*, burner signer not initalized</b>
        </div>
      );
    } else if (burner.account !== account) {
      display = (
        <div>
          <b>*injected account*, burner private key unknown</b>
        </div>
      );
    } else {
      const burnerPrivateKey: BytesLike = burner.getBurnerPrivateKey() ?? '';

      display = (
        <div>
          <b>Private Key:</b>

          <div>
            <Text copyable>{burnerPrivateKey}</Text>
          </div>

          <hr />

          <i>
            Point your camera phone at qr code to open in
            <a target="_blank" href={'https://xdai.io/' + burnerPrivateKey} rel="noopener noreferrer">
              burner wallet
            </a>
            :
          </i>
          <QR
            value={'https://xdai.io/' + burnerPrivateKey}
            size={450}
            level="H"
            includeMargin
            renderAs="svg"
            imageSettings={{ excavate: false, src: 'dai' }}
          />

          <Paragraph style={{ fontSize: '16' }} copyable>
            {'https://xdai.io/' + burnerPrivateKey}
          </Paragraph>
        </div>
      );
    }

    receiveButton = (
      <Button
        key="receive"
        onClick={(): void => {
          setQr(account);
          setPublicKey('');
        }}>
        <QrcodeOutlined /> Receive
      </Button>
    );
    privateKeyButton = (
      <Button
        key="hide"
        onClick={(): void => {
          setPublicKey('');
          setQr('');
        }}>
        <KeyOutlined /> Hide
      </Button>
    );
  } else {
    const inputStyle = {
      padding: 10,
    };

    display = (
      <div>
        <div style={inputStyle}>
          <AddressInput
            autoFocus
            ensProvider={props.ensProvider}
            placeholder="to address"
            address={toAddress}
            onChange={setToAddress}
          />
        </div>
        <div style={inputStyle}>
          <EtherInput
            price={props.price}
            value={amount}
            onChange={(value: string): void => {
              setAmount(value);
            }}
          />
        </div>
      </div>
    );
    receiveButton = (
      <Button
        key="receive"
        onClick={(): void => {
          setQr(account);
          setPublicKey('');
        }}>
        <QrcodeOutlined /> Receive
      </Button>
    );
    privateKeyButton = (
      <Button
        key="hide"
        onClick={(): void => {
          setPublicKey(account);
          setQr('');
        }}>
        <KeyOutlined /> Private Key
      </Button>
    );
  }

  const disableSend = amount == null || toAddress == null || (qr != null && qr !== '');

  return (
    <span>
      {providerSend}
      <Modal
        visible={open}
        title={
          <div>
            {account ? <Address address={account} ensProvider={props.ensProvider} /> : <Spin />}
            <div style={{ float: 'right', paddingRight: 25 }}>
              <Balance address={account} dollarMultiplier={props.price} />
            </div>
          </div>
        }
        onOk={(): void => {
          setQr('');
          setPublicKey('');
          setOpen(!open);
        }}
        onCancel={(): void => {
          setQr('');
          setPublicKey('');
          setOpen(!open);
        }}
        footer={[
          privateKeyButton,
          receiveButton,
          <Button
            key="submit"
            type="primary"
            disabled={disableSend}
            loading={false}
            onClick={(): void => {
              const tx = transactor(context, props.signer);

              let value;
              try {
                value = parseEther('' + amount);
              } catch (e) {
                // failed to parseEther, try something else
                value = parseEther('' + parseFloat(amount).toFixed(8));
              }

              void tx?.({
                to: toAddress,
                value,
              });

              setOpen(!open);
              setQr('');
            }}>
            <SendOutlined /> Send
          </Button>,
        ]}>
        {display}
      </Modal>
    </span>
  );
};
