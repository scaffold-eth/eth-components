import React, { FC } from 'react';

import { Identicon, IdenticonProps } from '~~/helpers/esm-fixtures/Identicon';

// provides a blockie image for the address using "react-blockies" library

interface IBlockieProps extends Omit<IdenticonProps, 'seed'> {
  address: string;
}

/**
 * Show a blockie (bar code profile icon) component for an public address
 * @param props
 * @returns (FC)
 */
export const Blockie: FC<IBlockieProps> = (props) => {
  if (!props.address || typeof props.address.toLowerCase !== 'function') {
    return <span />;
  }
  const { address, ...rest } = props;
  return <Identicon seed={address} {...rest} />;
};
