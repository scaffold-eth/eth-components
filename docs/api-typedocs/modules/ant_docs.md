[eth-components - v3.0.2](../README.md) / ant.docs

# Module: ant.docs

## Table of contents

### Interfaces

- [IAccountProps](../interfaces/ant_docs.IAccountProps.md)

### Variables

- [Account](ant_docs.md#account)
- [Address](ant_docs.md#address)
- [AddressInput](ant_docs.md#addressinput)
- [Balance](ant_docs.md#balance)
- [Blockie](ant_docs.md#blockie)
- [EtherInput](ant_docs.md#etherinput)
- [Faucet](ant_docs.md#faucet)
- [GasGauge](ant_docs.md#gasgauge)
- [PunkBlockie](ant_docs.md#punkblockie)
- [Wallet](ant_docs.md#wallet)
- [DisplayVariable](ant_docs.md#displayvariable)
- [FunctionForm](ant_docs.md#functionform)
- [NoContractDisplay](ant_docs.md#nocontractdisplay)

### Functions

- [GenericContract](ant_docs.md#genericcontract)
- [tryToDisplay](ant_docs.md#trytodisplay)

## Variables

### Account

• **Account**: `FC`<[`IAccountProps`](../interfaces/ant_docs.IAccountProps.md)\>

Displays an Address, Balance, and Wallet as one Account component,
also allows users to log in to existing accounts and log out

~ Features ~
- Provide address={address} and get balance corresponding to the given address
- Provide localProvider={localProvider} to access balance on local network
- Provide userProvider={userProvider} to display a wallet
- Provide mainnetProvider={mainnetProvider} and your address will be replaced by ENS name
(ex. "0xa870" => "user.eth")
- Provide web3Modal={web3Modal}, loadWeb3Modal={loadWeb3Modal}, logoutOfWeb3Modal={logoutOfWeb3Modal}
to be able to log in/log out to/from existing accounts
- Provide blockExplorer={blockExplorer}, click on address and get the link
(ex. by default "https://etherscan.io/" or for xdai "https://blockscout.com/poa/xdai/")

**`param`**

**`returns`** (FC)

#### Defined in

[ant/Account.tsx:49](https://github.com/scaffold-eth/eth-components/blob/74238a9/src/ant/Account.tsx#L49)

___

### Address

• **Address**: `FC`<`IAddressProps`\>

Displays an address with a blockie image and option to copy address

~ Features ~
- Provide ensProvider={mainnetProvider} and your address will be replaced by ENS name
(ex. "0xa870" => "user.eth")
- Provide blockExplorer={blockExplorer}, click on address and get the link
(ex. by default "https://etherscan.io/" or for xdai "https://blockscout.com/poa/xdai/")
- Provide fontSize={fontSize} to change the size of address text

**`param`**

**`returns`** (FC)

#### Defined in

[ant/Address.tsx:42](https://github.com/scaffold-eth/eth-components/blob/74238a9/src/ant/Address.tsx#L42)

___

### AddressInput

• **AddressInput**: `FC`<`IAddressInputProps`\>

Displays an address input with QR scan option
~ Features ~
- Provide ensProvider={mainnetProvider} and your address will be replaced by ENS name
(ex. "0xa870" => "user.eth") or you can enter directly ENS name instead of address
- Provide placeholder="Enter address" value for the input
- Value of the address input is stored in value={toAddress}
- Control input change by onChange={setToAddress}
or onChange={address => { setToAddress(address);}}

**`param`**

**`returns`** (FC)

#### Defined in

[ant/AddressInput.tsx:32](https://github.com/scaffold-eth/eth-components/blob/74238a9/src/ant/AddressInput.tsx#L32)

___

### Balance

• **Balance**: `FC`<`IBalanceProps`\>

Displays a balance of given address in ether & dollar

~ Features ~

- Provide address={address} and get balance corresponding to given address
- Provide provider={mainnetProvider} to access balance on mainnet or any other network (ex. localProvider)
- Provide price={price} of ether and get your balance converted to dollars

**`param`**

**`returns`** (FC)

#### Defined in

[ant/Balance.tsx:25](https://github.com/scaffold-eth/eth-components/blob/74238a9/src/ant/Balance.tsx#L25)

___

### Blockie

• **Blockie**: `FC`<`IBlockieProps`\>

Show a blockie (bar code profile icon) component for an public address

**`param`**

**`returns`** (FC)

#### Defined in

[ant/Blockie.tsx:16](https://github.com/scaffold-eth/eth-components/blob/74238a9/src/ant/Blockie.tsx#L16)

___

### EtherInput

• **EtherInput**: `FC`<`IEtherInputProps`\>

Displays input field for ETH/USD amount, with an option to convert between ETH and USD
~ Features ~

- Provide price={price} of ether and easily convert between USD and ETH
- Provide value={value} to specify initial amount of ether
- Provide placeholder="Enter amount" value for the input
- Control input change by onChange={value => { setAmount(value);}}

**`param`**

**`returns`** (FC)

#### Defined in

[ant/EtherInput.tsx:50](https://github.com/scaffold-eth/eth-components/blob/74238a9/src/ant/EtherInput.tsx#L50)

___

### Faucet

• **Faucet**: `FC`<`IFaucetProps`\>

Displays a local faucet to send ETH to given address, also wallet is provided

~ Features ~

- Provide price={price} of ether and convert between USD and ETH in a wallet
- Provide localProvider={localProvider} to be able to send ETH to given address
- Provide ensProvider={mainnetProvider} and your address will be replaced by ENS name
(ex. "0xa870" => "user.eth") or you can enter directly ENS name instead of address
works both in input field & wallet
- Provide placeholder="Send local faucet" value for the input

**`param`**

**`returns`** (FC)

#### Defined in

[ant/Faucet.tsx:41](https://github.com/scaffold-eth/eth-components/blob/74238a9/src/ant/Faucet.tsx#L41)

___

### GasGauge

• **GasGauge**: `FC`<`IGasGaugeProps`\>

Displays gas gauge.  Defaults to mainnet and uses gastation get get data.  You can also provide the data

**`param`**

**`returns`**

#### Defined in

[ant/GasGauge.tsx:18](https://github.com/scaffold-eth/eth-components/blob/74238a9/src/ant/GasGauge.tsx#L18)

___

### PunkBlockie

• **PunkBlockie**: `FC`<`IPunkBlockie`\>

Show a punk blockie (crypto punk profile icon) component for an public address

**`param`**

**`returns`** (FC)

#### Defined in

[ant/PunkBlockie.tsx:53](https://github.com/scaffold-eth/eth-components/blob/74238a9/src/ant/PunkBlockie.tsx#L53)

___

### Wallet

• **Wallet**: `FC`<`IWalletProps`\>

  Displays a wallet where you can specify address and send USD/ETH, with options to
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

**`param`**

**`returns`** (FC)

#### Defined in

[ant/Wallet.tsx:43](https://github.com/scaffold-eth/eth-components/blob/74238a9/src/ant/Wallet.tsx#L43)

___

### DisplayVariable

• **DisplayVariable**: `FC`<`IDisplayVariableProps`\>

#### Defined in

[ant/generic-contract/DisplayVariable.tsx:17](https://github.com/scaffold-eth/eth-components/blob/74238a9/src/ant/generic-contract/DisplayVariable.tsx#L17)

___

### FunctionForm

• **FunctionForm**: `FC`<`IFunctionForm`\>

#### Defined in

[ant/generic-contract/FunctionFrom.tsx:27](https://github.com/scaffold-eth/eth-components/blob/74238a9/src/ant/generic-contract/FunctionFrom.tsx#L27)

___

### NoContractDisplay

• **NoContractDisplay**: `FC`<{ `showLoading`: `boolean`  }\>

#### Defined in

[ant/generic-contract/NoContractDisplay.tsx:18](https://github.com/scaffold-eth/eth-components/blob/74238a9/src/ant/generic-contract/NoContractDisplay.tsx#L18)

## Functions

### GenericContract

▸ `Const` **GenericContract**<`GContract`\>(`props`): ``null`` \| `ReactElement`<`any`, `any`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `GContract` | extends `BaseContract`<`GContract`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `PropsWithChildren`<`IGenericContract`<`GContract`\>\> |

#### Returns

``null`` \| `ReactElement`<`any`, `any`\>

#### Defined in

[ant/generic-contract/GenericContract.tsx:30](https://github.com/scaffold-eth/eth-components/blob/74238a9/src/ant/generic-contract/GenericContract.tsx#L30)

___

### tryToDisplay

▸ `Const` **tryToDisplay**(`thing`): `string` \| `number` \| `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `thing` | `undefined` \| `string` \| `BigNumber` \| `Record`<`string`, `any`\> \| `TransactionResponse` |

#### Returns

`string` \| `number` \| `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\>

#### Defined in

[ant/generic-contract/displayUtils.tsx:8](https://github.com/scaffold-eth/eth-components/blob/74238a9/src/ant/generic-contract/displayUtils.tsx#L8)
