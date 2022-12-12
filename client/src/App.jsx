import Wallet from "./Wallet";
import Transfer from "./Transfer";
import Sign from "./Sign";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [transNb, setTransNb] = useState(0);
  const [nonce, setNonce] = useState(0);
  const [address, setAddress] = useState("");
  const [signature, setSignature] = useState("");
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [msgHash, setMsgHash] = useState("");
  const [recoveryBit, setRecoveryBit] = useState("");

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        transNb={transNb}
        setTransNb={setTransNb}
        address={address}
        setAddress={setAddress}
      />
      <Sign
        address={address}
        sendAmount={sendAmount}
        setSendAmount={setSendAmount}
        recipient={recipient}
        setRecipient={setRecipient}
        msgHash={msgHash}
        setMsgHash={setMsgHash}
        signature={signature}
        setSignature={setSignature}
        recoveryBit={recoveryBit}
        setRecoveryBit={setRecoveryBit}
        transNb={transNb}
        nonce={nonce}
        setNonce={setNonce}
      />
      <Transfer
        address={address}
        sendAmount={sendAmount}
        recipient={recipient}
        setBalance={setBalance}
        msgHash={msgHash}
        signature={signature}
        recoveryBit={recoveryBit}
        nonce={nonce}
        transNb={transNb}
        setTransNb={setTransNb}
      />
    </div>
  );
}

export default App;
