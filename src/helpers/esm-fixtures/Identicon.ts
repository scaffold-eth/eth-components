/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { FC } from 'react';
import * as cjs from 'react-blockies';

export const Identicon: FC<cjs.IdenticonProps> = (cjs.default as any)?.default ?? cjs.default;
export type IdenticonProps = cjs.IdenticonProps;
