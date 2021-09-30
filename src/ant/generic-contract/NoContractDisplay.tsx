import React, { FC } from 'react';

const CodeView: FC = (props) => (
  <span
    className="highlight"
    style={{
      marginLeft: 4,

      /* backgroundColor: "#f1f1f1", */
      padding: 4,
      borderRadius: 4,
      fontWeight: 'bolder',
    }}>
    {props.children}
  </span>
);

export const NoContractDisplay: FC<{ showLoading: boolean }> = (props) => {
  return (
    <div style={{ padding: 16 }}>
      {props.showLoading && 'Loading...'}
      <div style={{ padding: 16 }}>🤚🏽 Make sure you have deployed your contract and selected the right network!</div>
      <div style={{ padding: 16 }}>
        You need to run
        <CodeView>yarn run chain</CodeView>
        and
        <CodeView>to see your contract here.</CodeView>
      </div>
      <div style={{ padding: 16 }}>
        <span style={{ marginRight: 4 }} role="img" aria-label="warning">
          ☢️
        </span>
        Warning: You might need to run
        <CodeView>yarn run deploy</CodeView>
        <i>again</i> after the frontend comes up!
      </div>
    </div>
  );
};
