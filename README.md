# 🎨 Eth-Components Overview

React library of commonly used Ethereum components.

Used by 🏗 [scaffold-eth](https://github.com/scaffold-eth/scaffold-eth)
Used by 🏭 [scaffold-eth-typescript](https://github.com/scaffold-eth/scaffold-eth-typescript)

Created by 🏰 [BuidlGuidl.eth](https://BuidlGuidl.com)

## Install

```sh
yarn add eth-components
```

## Authors

[@austinGriffith](https://github.com/austintgriffith)
[@shravansunder](https://github.com/ShravanSunder)

## Dependencies

- react & general
  - react
  - react-dom
  - react-css-theme-switcher
  - web3modal
- ant design
  - antd
  - @ant-design/icons

# API Docs

## Documentation site

- [Docs @gitbook](https://docs.scaffoldeth.io/scaffold-eth/toolkit/scaffold-eth-toolbox/eth-components)

## Components &amp; Helpers

<dl>
<dt><a href="#useEthersProvider">useEthersProvider</a> ⇒</dt>
<dd><p>A wrapper around useWeb3React that we can extend as required</p>
</dd>
<dt><a href="#renderTestHook">renderTestHook</a> ⇒</dt>
<dd><p>Created a test hook with a Web3Wrapper</p>
</dd>
<dt><a href="#Account">Account</a> ⇒</dt>
<dd><p>Displays an Address, Balance, and Wallet as one Account component,
  also allows users to log in to existing accounts and log out</p>
<pre><code>~ Features ~
</code></pre>
<ul>
<li>Provide address={address} and get balance corresponding to the given address</li>
<li>Provide localProvider={localProvider} to access balance on local network</li>
<li>Provide userProvider={userProvider} to display a wallet</li>
<li>Provide mainnetProvider={mainnetProvider} and your address will be replaced by ENS name<pre><code>      (ex. &quot;0xa870&quot; =&gt; &quot;user.eth&quot;)
</code></pre>
</li>
<li>Provide price={price} of ether and get your balance converted to dollars</li>
<li>Provide web3Modal={web3Modal}, loadWeb3Modal={loadWeb3Modal}, logoutOfWeb3Modal={logoutOfWeb3Modal}<pre><code>      to be able to log in/log out to/from existing accounts
</code></pre>
</li>
<li>Provide blockExplorer={blockExplorer}, click on address and get the link<pre><code>      (ex. by default &quot;https://etherscan.io/&quot; or for xdai &quot;https://blockscout.com/poa/xdai/&quot;)
</code></pre>
</li>
</ul>
</dd>
<dt><a href="#Address">Address</a> ⇒</dt>
<dd><p>Displays an address with a blockie image and option to copy address</p>
<p>  ~ Features ~</p>
<ul>
<li>Provide ensProvider={mainnetProvider} and your address will be replaced by ENS name<pre><code>      (ex. &quot;0xa870&quot; =&gt; &quot;user.eth&quot;)
</code></pre>
</li>
<li>Provide blockExplorer={blockExplorer}, click on address and get the link<pre><code>      (ex. by default &quot;https://etherscan.io/&quot; or for xdai &quot;https://blockscout.com/poa/xdai/&quot;)
</code></pre>
</li>
<li>Provide fontSize={fontSize} to change the size of address text</li>
</ul>
</dd>
<dt><a href="#AddressInput">AddressInput</a> ⇒</dt>
<dd><p>Displays an address input with QR scan option
  ~ Features ~</p>
<ul>
<li>Provide ensProvider={mainnetProvider} and your address will be replaced by ENS name<pre><code>      (ex. &quot;0xa870&quot; =&gt; &quot;user.eth&quot;) or you can enter directly ENS name instead of address
</code></pre>
</li>
<li>Provide placeholder=&quot;Enter address&quot; value for the input</li>
<li>Value of the address input is stored in value={toAddress}</li>
<li>Control input change by onChange={setToAddress}<pre><code>                  or onChange={address =&gt; { setToAddress(address);}}
</code></pre>
</li>
</ul>
</dd>
<dt><a href="#Balance">Balance</a> ⇒</dt>
<dd><p>Displays a balance of given address in ether &amp; dollar</p>
<p>  ~ Features ~</p>
<ul>
<li>Provide address={address} and get balance corresponding to given address</li>
<li>Provide provider={mainnetProvider} to access balance on mainnet or any other network (ex. localProvider)</li>
<li>Provide price={price} of ether and get your balance converted to dollars</li>
</ul>
</dd>
<dt><a href="#Blockie">Blockie</a> ⇒</dt>
<dd><p>Show a blockie (bar code profile icon) component for an public address</p>
</dd>
<dt><a href="#EtherInput">EtherInput</a> ⇒</dt>
<dd><p>Displays input field for ETH/USD amount, with an option to convert between ETH and USD
  ~ Features ~</p>
<ul>
<li>Provide price={price} of ether and easily convert between USD and ETH</li>
<li>Provide value={value} to specify initial amount of ether</li>
<li>Provide placeholder=&quot;Enter amount&quot; value for the input</li>
<li>Control input change by onChange={value =&gt; { setAmount(value);}}</li>
</ul>
</dd>
<dt><a href="#Faucet">Faucet</a> ⇒</dt>
<dd><p>Displays a local faucet to send ETH to given address, also wallet is provided</p>
<p>~ Features ~</p>
<ul>
<li>Provide price={price} of ether and convert between USD and ETH in a wallet</li>
<li>Provide localProvider={localProvider} to be able to send ETH to given address</li>
<li>Provide ensProvider={mainnetProvider} and your address will be replaced by ENS name<pre><code>      (ex. &quot;0xa870&quot; =&gt; &quot;user.eth&quot;) or you can enter directly ENS name instead of address
      works both in input field &amp; wallet
</code></pre>
</li>
<li>Provide placeholder=&quot;Send local faucet&quot; value for the input</li>
</ul>
</dd>
<dt><a href="#GasGauge">GasGauge</a> ⇒</dt>
<dd><p>Displays gas gauge</p>
<p>  ~ Features ~</p>
<ul>
<li>Provide gasPrice={gasPrice} and get current gas gauge</li>
</ul>
</dd>
<dt><a href="#PunkBlockie">PunkBlockie</a> ⇒</dt>
<dd><p>Show a punk blockie (crypto punk profile icon) component for an public address</p>
</dd>
<dt><a href="#Wallet">Wallet</a> ⇒</dt>
<dd><p>Displays a wallet where you can specify address and send USD/ETH, with options to
  scan address, to convert between USD and ETH, to see and generate private keys,
  to send, receive and extract the burner wallet
  ~ Features ~</p>
<ul>
<li>Provide provider={userProvider} to display a wallet</li>
<li>Provide address={address} if you want to specify address, otherwise<pre><code>                                            your default address will be used
</code></pre>
</li>
<li>Provide ensProvider={mainnetProvider} and your address will be replaced by ENS name<pre><code>      (ex. &quot;0xa870&quot; =&gt; &quot;user.eth&quot;) or you can enter directly ENS name instead of address
</code></pre>
</li>
<li>Provide price={price} of ether and easily convert between USD and ETH</li>
<li>Provide color to specify the color of wallet icon</li>
</ul>
</dd>
<dt><a href="#transactor">transactor</a> ⇒</dt>
<dd><p>this should probably just be renamed to &quot;notifier&quot;
it is basically just a wrapper around BlockNative&#39;s wonderful Notify.js
<a href="https://docs.blocknative.com/notify">https://docs.blocknative.com/notify</a></p>
</dd>
</dl>

<a name="useEthersProvider"></a>

## useEthersProvider ⇒

A wrapper around useWeb3React that we can extend as required

**Kind**: global constant  
**Returns**: TEthersManager  
<a name="renderTestHook"></a>

## renderTestHook ⇒

Created a test hook with a Web3Wrapper

**Kind**: global constant  
**Returns**: (TTestHookResult)  
**See**: renderHook from @link testing-library/react-hooks

| Param    | Description           |
| -------- | --------------------- |
| callback | callback to init hook |

<a name="Account"></a>

## Account ⇒

Displays an Address, Balance, and Wallet as one Account component,
also allows users to log in to existing accounts and log out

    ~ Features ~

- Provide address={address} and get balance corresponding to the given address
- Provide localProvider={localProvider} to access balance on local network
- Provide userProvider={userProvider} to display a wallet
- Provide mainnetProvider={mainnetProvider} and your address will be replaced by ENS name
  (ex. "0xa870" => "user.eth")
- Provide price={price} of ether and get your balance converted to dollars
- Provide web3Modal={web3Modal}, loadWeb3Modal={loadWeb3Modal}, logoutOfWeb3Modal={logoutOfWeb3Modal}
  to be able to log in/log out to/from existing accounts
- Provide blockExplorer={blockExplorer}, click on address and get the link
  (ex. by default "https://etherscan.io/" or for xdai "https://blockscout.com/poa/xdai/")

**Kind**: global constant  
**Returns**: (FC)

| Param |
| ----- |
| props |

<a name="Address"></a>

## Address ⇒

Displays an address with a blockie image and option to copy address

~ Features ~

- Provide ensProvider={mainnetProvider} and your address will be replaced by ENS name
  (ex. "0xa870" => "user.eth")
- Provide blockExplorer={blockExplorer}, click on address and get the link
  (ex. by default "https://etherscan.io/" or for xdai "https://blockscout.com/poa/xdai/")
- Provide fontSize={fontSize} to change the size of address text

**Kind**: global constant  
**Returns**: (FC)

| Param |
| ----- |
| props |

<a name="AddressInput"></a>

## AddressInput ⇒

Displays an address input with QR scan option
~ Features ~

- Provide ensProvider={mainnetProvider} and your address will be replaced by ENS name
  (ex. "0xa870" => "user.eth") or you can enter directly ENS name instead of address
- Provide placeholder="Enter address" value for the input
- Value of the address input is stored in value={toAddress}
- Control input change by onChange={setToAddress}
  or onChange={address => { setToAddress(address);}}

**Kind**: global constant  
**Returns**: (FC)

| Param |
| ----- |
| props |

<a name="Balance"></a>

## Balance ⇒

Displays a balance of given address in ether & dollar

~ Features ~

- Provide address={address} and get balance corresponding to given address
- Provide provider={mainnetProvider} to access balance on mainnet or any other network (ex. localProvider)
- Provide price={price} of ether and get your balance converted to dollars

**Kind**: global constant  
**Returns**: (FC)

| Param |
| ----- |
| props |

<a name="Blockie"></a>

## Blockie ⇒

Show a blockie (bar code profile icon) component for an public address

**Kind**: global constant  
**Returns**: (FC)

| Param |
| ----- |
| props |

<a name="EtherInput"></a>

## EtherInput ⇒

Displays input field for ETH/USD amount, with an option to convert between ETH and USD
~ Features ~

- Provide price={price} of ether and easily convert between USD and ETH
- Provide value={value} to specify initial amount of ether
- Provide placeholder="Enter amount" value for the input
- Control input change by onChange={value => { setAmount(value);}}

**Kind**: global constant  
**Returns**: (FC)

| Param |
| ----- |
| props |

<a name="Faucet"></a>

## Faucet ⇒

Displays a local faucet to send ETH to given address, also wallet is provided

~ Features ~

- Provide price={price} of ether and convert between USD and ETH in a wallet
- Provide localProvider={localProvider} to be able to send ETH to given address
- Provide ensProvider={mainnetProvider} and your address will be replaced by ENS name
  (ex. "0xa870" => "user.eth") or you can enter directly ENS name instead of address
  works both in input field & wallet
- Provide placeholder="Send local faucet" value for the input

**Kind**: global constant  
**Returns**: (FC)

| Param |
| ----- |
| props |

<a name="GasGauge"></a>

## GasGauge ⇒

Displays gas gauge

~ Features ~

- Provide gasPrice={gasPrice} and get current gas gauge

**Kind**: global constant  
**Returns**: (FC)

| Param |
| ----- |
| props |

<a name="PunkBlockie"></a>

## PunkBlockie ⇒

Show a punk blockie (crypto punk profile icon) component for an public address

**Kind**: global constant  
**Returns**: (FC)

| Param |
| ----- |
| props |

<a name="Wallet"></a>

## Wallet ⇒

Displays a wallet where you can specify address and send USD/ETH, with options to
scan address, to convert between USD and ETH, to see and generate private keys,
to send, receive and extract the burner wallet
~ Features ~

- Provide provider={userProvider} to display a wallet
- Provide address={address} if you want to specify address, otherwise
  your default address will be used
- Provide ensProvider={mainnetProvider} and your address will be replaced by ENS name
  (ex. "0xa870" => "user.eth") or you can enter directly ENS name instead of address
- Provide price={price} of ether and easily convert between USD and ETH
- Provide color to specify the color of wallet icon

**Kind**: global constant  
**Returns**: (FC)

| Param |
| ----- |
| props |

<a name="transactor"></a>

## transactor ⇒

this should probably just be renamed to "notifier"
it is basically just a wrapper around BlockNative's wonderful Notify.js
https://docs.blocknative.com/notify

**Kind**: global constant  
**Returns**: (transactor) a function to transact which calls a callback method parameter on completion

| Param     |
| --------- |
| provider  |
| gasPrice  |
| etherscan |
