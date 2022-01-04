import React from "react";
import { useThemeSwitcher } from "react-css-theme-switcher";
import { Typography } from "antd";
import useAddress from "../useEthComponent/Address";
import Blockies from "./Blockie";

const { Text } = Typography;

function Address({ ens, address, shortAddress, explorerLink, ...props }) {
  const { currentTheme } = useThemeSwitcher();

  return (
    <span>
      <span style={{ verticalAlign: "middle" }}>
        <Blockies seed={address.toLowerCase()} size={8} scale={props.fontSize ? props.fontSize / 7 : 4} />
      </span>
      <span style={{ verticalAlign: "middle", paddingLeft: 5, fontSize: props.fontSize ? props.fontSize : 28 }}>
        {props.onChange ? (
          <Text editable={{ onChange: props.onChange }} copyable={{ text: address }}>
            <a
              style={{ color: currentTheme === "light" ? "#222222" : "#ddd" }}
              target="_blank"
              href={explorerLink}
              rel="noopener noreferrer"
            >
              {ens || shortAddress}
            </a>
          </Text>
        ) : (
          <Text copyable={{ text: address }}>
            <a
              style={{ color: currentTheme === "light" ? "#222222" : "#ddd" }}
              target="_blank"
              href={explorerLink}
              rel="noopener noreferrer"
            >
              {ens || shortAddress}
            </a>
          </Text>
        )}
      </span>
    </span>
  );
}

export default useAddress(Address);
