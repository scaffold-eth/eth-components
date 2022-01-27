import React, { FC } from 'react';
import Blockies from 'react-blockies';

// provides a blockie image for the address using "react-blockies" library

interface IBlockieProps {
  address: string;
  scale: number;
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

  return <Blockies seed={props.address.toLowerCase()} {...props} />;
};
