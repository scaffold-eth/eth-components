import { TransactionResponse } from '@ethersproject/providers';
import { formatUnits } from '@ethersproject/units';
import { BigNumber } from 'ethers';
import React, { ReactElement } from 'react';

import { Address } from '~~/ant/Address';

export const tryToDisplay = (
  thing: string | number | BigNumber | Record<string, any> | TransactionResponse | undefined
): string | ReactElement | number => {
  let displayContent = thing;
  if (displayContent == null) return '';
  if (
    Array.isArray(displayContent) &&
    displayContent.length === 1 &&
    (typeof displayContent[0] === 'string' ||
      typeof displayContent[0] === 'number' ||
      BigNumber.isBigNumber(displayContent[0]))
  ) {
    // unroll ethers.js array
    displayContent = displayContent[0];
  }
  if (BigNumber.isBigNumber(displayContent)) {
    try {
      return displayContent.toNumber();
    } catch (e) {
      return 'Ξ' + formatUnits(displayContent, 'ether');
    }
  }
  if (typeof displayContent === 'string' && displayContent.indexOf('0x') === 0 && displayContent.length === 42) {
    return <Address address={displayContent} fontSize={22} />;
  }
  return JSON.stringify(thing);
};
