[eth-components - v3.0.2](../README.md) / functions.docs

# Module: functions.docs

## Table of contents

### Type aliases

- [TTransactorFunc](functions_docs.md#ttransactorfunc)

### Functions

- [transactor](functions_docs.md#transactor)

## Type aliases

### TTransactorFunc

Ƭ **TTransactorFunc**: (`tx`: `Deferrable`<`TransactionRequest`\> \| `Promise`<`TransactionResponse`\> \| `Promise`<`ContractTransaction`\> \| `undefined`, `callback?`: (`_param`: `any`) => `void`) => `Promise`<`Record`<`string`, `any`\> \| `undefined`\>

#### Type declaration

▸ (`tx`, `callback?`): `Promise`<`Record`<`string`, `any`\> \| `undefined`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `tx` | `Deferrable`<`TransactionRequest`\> \| `Promise`<`TransactionResponse`\> \| `Promise`<`ContractTransaction`\> \| `undefined` |
| `callback?` | (`_param`: `any`) => `void` |

##### Returns

`Promise`<`Record`<`string`, `any`\> \| `undefined`\>

#### Defined in

[functions/transactor.ts:13](https://github.com/scaffold-eth/eth-components/blob/74238a9/src/functions/transactor.ts#L13)

## Functions

### transactor

▸ `Const` **transactor**(`settings`, `signer`, `gasPrice?`, `etherscan?`, `throwOnError?`): `undefined` \| [`TTransactorFunc`](functions_docs.md#ttransactorfunc)

this should probably just be renamed to "notifier"
it is basically just a wrapper around BlockNative's wonderful Notify.js
https://docs.blocknative.com/notify

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `settings` | [`IEthComponentsSettings`](../interfaces/models_docs.IEthComponentsSettings.md) | `undefined` |
| `signer` | `undefined` \| `TEthersSigner` | `undefined` |
| `gasPrice?` | `number` | `undefined` |
| `etherscan?` | `string` | `undefined` |
| `throwOnError` | `boolean` | `false` |

#### Returns

`undefined` \| [`TTransactorFunc`](functions_docs.md#ttransactorfunc)

(transactor) a function to transact which calls a callback method parameter on completion

#### Defined in

[functions/transactor.ts:28](https://github.com/scaffold-eth/eth-components/blob/74238a9/src/functions/transactor.ts#L28)
