import { Col, Divider, Row } from 'antd';
import { ContractFunction } from 'ethers';
import { FunctionFragment } from 'ethers/lib/utils';
import React, { FC, SetStateAction, useCallback, useEffect, useState, Dispatch } from 'react';
import { useIsMounted } from 'usehooks-ts';

import { tryToDisplay } from './displayUtils';

interface IDisplayVariableProps {
  contractFunction: ContractFunction | undefined;
  functionInfo: FunctionFragment;
  refreshRequired: boolean;
  setTriggerRefresh: Dispatch<SetStateAction<boolean>>;
}

export const DisplayVariable: FC<IDisplayVariableProps> = (props) => {
  const [variable, setVariable] = useState('');
  const isMounted = useIsMounted();

  const refresh = useCallback(async () => {
    try {
      if (props.contractFunction) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const result = await props.contractFunction();

        if (isMounted()) {
          setVariable(result);
          props.setTriggerRefresh(false);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }, [props, isMounted]);

  useEffect((): void => {
    void refresh();
  }, [refresh, props.refreshRequired, props.contractFunction]);

  return (
    <div>
      <Row>
        <Col
          span={8}
          style={{
            textAlign: 'right',
            opacity: 0.333,
            paddingRight: 6,
            fontSize: 24,
          }}>
          {props.functionInfo.name}
        </Col>
        <Col span={14}>
          <h2>{tryToDisplay(variable)}</h2>
        </Col>
        <Col span={2}>
          <h2>
            <a href="#" onClick={refresh}>
              🔄
            </a>
          </h2>
        </Col>
      </Row>
      <Divider />
    </div>
  );
};

export default DisplayVariable;
