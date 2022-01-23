import { TransactionRequest, TransactionResponse } from '@ethersproject/providers';
import { notification } from 'antd';
import { ArgsProps } from 'antd/lib/notification';
import Notify, { API, InitOptions } from 'bnc-notify';
import { parseProviderOrSigner } from 'eth-hooks/functions';
import { TEthersSigner } from 'eth-hooks/models';
import { BigNumber, ethers } from 'ethers';
import { Deferrable } from 'ethers/lib/utils';

import {
  checkBlocknativeAppId,
  IEthComponentsSettings as IEthComponentsSettings,
} from '~~/models/EthComponentsSettings';

const callbacks: Record<string, any> = {};
const DEBUG = true;

export class TransactorError extends Error {
  rawError: TRawTxError;

  constructor({ message, rawError }: { message?: string; rawError: TRawTxError }) {
    super();
    this.message = message ?? 'Generic Error';
    this.rawError = rawError;
  }
}

export type TRawTxError = Error & {
  data?: {
    message?: string;
  };
};

export type TTransactor = (
  tx: Deferrable<TransactionRequest> | Promise<TransactionResponse>,
  callback?: ((_param: any) => void) | undefined
) => Promise<Record<string, any> | TransactionResponse | undefined>;

/**
 *  The {@link NotificationMessage} type is an alias to the correct {@link ArgsProps}.
 *
 *  Antd lib have 2 ArgsProps definition (check example below)
 *  That alias avoid the wrong import when using {@link transactor} function
 *  with the filter callback {@link TFilterErrorMessage}.
 *  @example
 *  ```
 *  import { ArgsProps } from 'antd/lib/notification';
 *  import { ArgsProps } from 'antd/lib/message';
 *  ```
 */
export type NotificationMessage = ArgsProps;

/**
 * A filter callback that act like a middleware to notification messages,
 * ableing custom the notification errors message and descriptions
 * messages returning {@link NotificationMessage.message}
 * and {@link NotificationMessage.description} changed.
 *
 * @param settings (IEthComponentsContext)
 * @param err - {@link TRawTxError} original error was throwed by transaction.
 * @param notificationMessage - {@link NotificationMessage}
 * inherits from {@link ArgsProps} contains the default message and description
 * @returns (NotificationMessage) return {@link NotificationMessage} will be used on notification error.
 */
export type TFilterErrorMessage = (err: TRawTxError, notificationMessage: NotificationMessage) => NotificationMessage;

/**
 * this should probably just be renamed to "notifier"
 * it is basically just a wrapper around BlockNative's wonderful Notify.js
 * https://docs.blocknative.com/notify
 * @param settings (IEthComponentsContext)
 * @param provider
 * @param gasPrice
 * @param etherscan
 * @param throwOnError - throwOnError default value its false, if true it will throw errors.
 * @param filterErrorMessage - receive the {@link TRawTxError} to custom your errors message and description at notification.
 * @returns (TTransactor) a function to transact which calls a callback method parameter on completion
 * @throws {@link TransactorError} class
 */
export const transactor = (
  settings: IEthComponentsSettings,
  signer: TEthersSigner | undefined,
  gasPrice?: number,
  etherscan?: string,
  throwOnError: boolean = false,
  filterErrorMessage?: TFilterErrorMessage
): TTransactor | undefined => {
  if (signer != null) {
    return async (
      tx: Deferrable<TransactionRequest> | Promise<TransactionResponse>,
      callback?: (_param: any) => void
    ): Promise<Record<string, any> | TransactionResponse | undefined> => {
      const { provider, providerNetwork } = await parseProviderOrSigner(signer);

      checkBlocknativeAppId(settings);

      let options: InitOptions | undefined;
      let notify: API | undefined;
      if (navigator.onLine) {
        options = {
          dappId: settings.apiKeys.BlocknativeDappId, // GET YOUR OWN KEY AT https://account.blocknative.com
          system: 'ethereum',
          networkId: providerNetwork?.chainId,
          // darkMode: Boolean, // (default: false)
          transactionHandler: (txInformation: any): void => {
            if (DEBUG) console.log('HANDLE TX', txInformation);
            const possibleFunction = callbacks[txInformation.transaction.hash];
            if (typeof possibleFunction === 'function') {
              possibleFunction(txInformation.transaction);
            }
          },
        };
        notify = Notify(options);
      }

      let etherscanNetwork = '';
      if (providerNetwork?.name && providerNetwork?.chainId > 1) {
        etherscanNetwork = providerNetwork.name + '.';
      }

      let etherscanTxUrl = 'https://' + etherscanNetwork + 'etherscan.io/tx/';
      if (providerNetwork?.chainId === 100) {
        etherscanTxUrl = 'https://blockscout.com/poa/xdai/tx/';
      }

      try {
        let result: TransactionResponse | undefined;
        if (tx instanceof Promise) {
          if (DEBUG) console.log('AWAITING TX', tx);
          const data = await tx;
          result = data;
        } else {
          if (!tx.gasPrice) {
            tx.gasPrice = gasPrice || ethers.utils.parseUnits('4.1', 'gwei');
          }
          if (!tx.gasLimit) {
            tx.gasLimit = BigNumber.from(ethers.utils.hexlify(120000));
          }
          if (DEBUG) console.log('RUNNING TX', tx);
          result = await signer?.sendTransaction(tx);
        }
        if (DEBUG) console.log('RESULT:', result);
        // console.log("Notify", notify);
        if (callback && result) {
          callbacks[result.hash] = callback;
        }

        // result is valid and is a TransactionResponse
        if (result && 'wait' in result && result.wait) {
          // if it is a valid Notify.js network, use that, if not, just send a default notification
          if (
            providerNetwork != null &&
            [1, 3, 4, 5, 42, 100].indexOf(providerNetwork.chainId) >= 0 &&
            notify != null
          ) {
            const { emitter } = notify.hash(result.hash);
            emitter.on('all', (transaction) => {
              return {
                onclick: (): void => {
                  window.open(`${etherscan ?? etherscanTxUrl ?? ''}${transaction.hash ?? ''}`);
                },
              };
            });
          } else {
            notification.info({
              message: 'Local Transaction Sent',
              description: result?.hash,
              placement: 'bottomRight',
            });
            // on most networks BlockNative will update a transaction handler,
            // but locally we will set an interval to listen...
            if (callback != null && result?.hash != null) {
              let listeningInterval: NodeJS.Timeout | undefined = undefined;
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              listeningInterval = setInterval(async (): Promise<void> => {
                if (result?.hash != null) {
                  console.log('CHECK IN ON THE TX', result, provider);
                  const currentTransactionReceipt = await provider?.getTransactionReceipt(result.hash);
                  if (currentTransactionReceipt && currentTransactionReceipt.confirmations) {
                    callback({ ...result, ...currentTransactionReceipt });
                    if (listeningInterval) clearInterval(listeningInterval);
                  }
                }
              }, 500);
            }
          }

          await result.wait();
        }

        return result;
      } catch (e: any) {
        if (DEBUG) console.log(e);

        const err = e as TRawTxError;

        const extractedReason = err.data?.message?.match(/reverted with reason string \'(.*?)\'/);

        let notificationMessage: NotificationMessage = {
          message: 'Transaction Error',
          description: err.message,
        };

        if (extractedReason && extractedReason.length > 0) {
          notificationMessage.description = extractedReason[1];
        }

        if (filterErrorMessage) {
          notificationMessage = filterErrorMessage(err, notificationMessage);
        }

        notification.error(notificationMessage);

        if (throwOnError)
          throw new TransactorError({ message: notificationMessage.description?.toString(), rawError: err });
      }
    };
  }
};
