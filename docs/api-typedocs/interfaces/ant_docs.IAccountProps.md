[eth-components - v3.0.2](../README.md) / [ant.docs](../modules/ant_docs.md) / IAccountProps

# Interface: IAccountProps

[ant.docs](../modules/ant_docs.md).IAccountProps

## Table of contents

### Properties

- [ensProvider](ant_docs.IAccountProps.md#ensprovider)
- [localProvider](ant_docs.IAccountProps.md#localprovider)
- [createLoginConnector](ant_docs.IAccountProps.md#createloginconnector)
- [signer](ant_docs.IAccountProps.md#signer)
- [hasContextConnect](ant_docs.IAccountProps.md#hascontextconnect)
- [fontSize](ant_docs.IAccountProps.md#fontsize)
- [blockExplorer](ant_docs.IAccountProps.md#blockexplorer)
- [price](ant_docs.IAccountProps.md#price)

## Properties

### ensProvider

• **ensProvider**: `undefined` \| `StaticJsonRpcProvider`

#### Defined in

[ant/Account.tsx:16](https://github.com/scaffold-eth/eth-components/blob/74238a9/src/ant/Account.tsx#L16)

___

### localProvider

• `Optional` **localProvider**: `StaticJsonRpcProvider`

#### Defined in

[ant/Account.tsx:17](https://github.com/scaffold-eth/eth-components/blob/74238a9/src/ant/Account.tsx#L17)

___

### createLoginConnector

• `Optional` **createLoginConnector**: `TCreateEthersModalConnector`

#### Defined in

[ant/Account.tsx:18](https://github.com/scaffold-eth/eth-components/blob/74238a9/src/ant/Account.tsx#L18)

___

### signer

• `Optional` **signer**: `Signer`

if hasContextConnect is true, it will not use this variable

#### Defined in

[ant/Account.tsx:22](https://github.com/scaffold-eth/eth-components/blob/74238a9/src/ant/Account.tsx#L22)

___

### hasContextConnect

• **hasContextConnect**: `boolean`

if hasContextConnect = false, do not use context or context connect/login/logout.  only used passed in address.  defaults={false}

#### Defined in

[ant/Account.tsx:26](https://github.com/scaffold-eth/eth-components/blob/74238a9/src/ant/Account.tsx#L26)

___

### fontSize

• `Optional` **fontSize**: `number`

#### Defined in

[ant/Account.tsx:27](https://github.com/scaffold-eth/eth-components/blob/74238a9/src/ant/Account.tsx#L27)

___

### blockExplorer

• **blockExplorer**: `string`

#### Defined in

[ant/Account.tsx:28](https://github.com/scaffold-eth/eth-components/blob/74238a9/src/ant/Account.tsx#L28)

___

### price

• **price**: `number`

#### Defined in

[ant/Account.tsx:29](https://github.com/scaffold-eth/eth-components/blob/74238a9/src/ant/Account.tsx#L29)
