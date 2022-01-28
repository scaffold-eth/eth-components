import { message, Typography } from 'antd';
import QR from 'qrcode.react';
import React, { useState, useEffect, FC } from 'react';

import { Blockie } from '.';

const { Text } = Typography;

interface IWindowSize {
  width: number | undefined;
  height: number | undefined;
}

const useWindowSize = (): IWindowSize => {
  const isClient = typeof window === 'object';

  function getSize(): IWindowSize {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect((): (() => void) => {
    const handleResize = (): void => {
      setWindowSize(getSize());
    };

    if (isClient) {
      window.addEventListener('resize', handleResize);
    }
    return (): void => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
};

interface IPunkBlockie {
  address: string;
  withQr: boolean;
  scale?: number;
}

/**
 * Show a punk blockie (crypto punk profile icon) component for an public address
 * @param props
 * @returns  (FC)
 */
export const PunkBlockie: FC<IPunkBlockie> = (props) => {
  const size = useWindowSize();
  if (!size.width) size.width = 100;
  if (!size.height) size.height = 100;
  const minSize = 360;
  let qrWidth;
  if (size.width && size.width / 3 < minSize) {
    qrWidth = minSize;
  } else {
    qrWidth = size.width ?? minSize / 3;
  }

  const scale = props.scale ?? Math.min(size.height - 130, size.width, 1024) / (qrWidth * 1);

  const offset = 0.42;

  const url = window.location.href + '';

  const hardcodedSizeForNow = 380;

  const punkSize = 112;

  const part1 = props.address && props.address.substr(2, 20);
  const part2 = props.address && props.address.substr(22);
  const x = parseInt(part1, 16) % 100;
  const y = parseInt(part2, 16) % 100;

  // console.log("window.location",window.location)

  return (
    <div
      style={{
        transform: `scale(${props.scale ? props.scale : '1'})`,
        transformOrigin: '50% 50%',
        margin: 'auto',
        position: 'relative',
        width: hardcodedSizeForNow,
      }}
      onClick={(): void => {
        const el = document.createElement('textarea');
        el.value = props.address;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        const iconPunkSize = 40;
        void message.success(
          <span style={{ position: 'relative' }}>
            Copied Address
            <div style={{ position: 'absolute', left: -60, top: -14 }}>
              <div style={{ position: 'relative', width: iconPunkSize, height: iconPunkSize - 1, overflow: 'hidden' }}>
                <img
                  src="/punks.png"
                  style={{
                    position: 'absolute',
                    left: -iconPunkSize * x,
                    top: -iconPunkSize * y,
                    width: iconPunkSize * 100,
                    height: iconPunkSize * 100,
                    imageRendering: 'pixelated',
                  }}
                />
              </div>
            </div>
          </span>
        );
      }}>
      <div
        style={{
          position: 'absolute',
          opacity: 0.5,
          left: hardcodedSizeForNow / 2 - 46,
          top: hardcodedSizeForNow / 2 - 46,
        }}>
        <Blockie address={props.address} scale={11.5} />
      </div>

      <div style={{ position: 'absolute', left: hardcodedSizeForNow / 2 - 53, top: hardcodedSizeForNow / 2 - 65 }}>
        <div style={{ position: 'relative', width: punkSize, height: punkSize - 1, overflow: 'hidden' }}>
          <img
            src="/punks.png"
            style={{
              position: 'absolute',
              left: -punkSize * x,
              top: -punkSize * y - 1,
              width: punkSize * 100,
              height: punkSize * 100,
              imageRendering: 'pixelated',
            }}
          />
        </div>
      </div>

      {props.withQr ? (
        <QR
          level="H"
          includeMargin={false}
          // ethereum:0x34aA3F359A9D614239015126635CE7732c18fDF3
          value={props.address ? 'ethereum:' + props.address : ''}
          size={hardcodedSizeForNow}
          imageSettings={{ width: 105, height: 105, excavate: true, src: 'qr' }}
        />
      ) : (
        ''
      )}
    </div>
  );
};
