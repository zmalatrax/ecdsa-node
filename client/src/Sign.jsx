import { useState } from "react";
import server from "./server";

import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes, toHex } from "ethereum-cryptography/utils";
import * as secp from "ethereum-cryptography/secp256k1";

function Sign({
  address,
  recipient,
  setRecipient,
  sendAmount,
  setSendAmount,
  msgHash,
  setMsgHash,
  signature,
  setSignature,
  recoveryBit,
  setRecoveryBit,
  transNb,
  nonce,
  setNonce,
}) {
  const [privateKey, setPrivateKey] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function sign(evt) {
    evt.preventDefault();

    try {
      setNonce(transNb);
      const msgHash = keccak256(
        utf8ToBytes(
          `${address} sending ${sendAmount} to ${recipient}, ${nonce}`
        )
      );
      const signatureArray = await secp.sign(msgHash, privateKey, {
        recovered: true,
        extraEntropy: true,
      });
      const signature = signatureArray[0];
      const recoveryBit = signatureArray[1];

      setMsgHash(msgHash);
      setSignature(signature);
      setRecoveryBit(recoveryBit);
    } catch (ex) {
      alert(ex);
    }
  }

  return (
    <div className="container sign">
      <h1>Sign transaction</h1>
      <form className="sign" onSubmit={sign}>
        <label>
          Send Amount
          <input
            placeholder="1, 2, 3..."
            value={sendAmount}
            onChange={setValue(setSendAmount)}
          ></input>
        </label>

        <label>
          Recipient
          <input
            placeholder="Type an address, for example: 0x2"
            value={recipient}
            onChange={setValue(setRecipient)}
          ></input>
        </label>
        <label>
          Private Key
          <input
            type="password"
            placeholder="Type your private key, for example: de4d"
            value={privateKey}
            onChange={setValue(setPrivateKey)}
          ></input>
        </label>

        <input type="submit" className="button" value="Sign" />
      </form>
      <div className="output">Message Hash: {msgHash}</div>

      <div className="output">Signature: {signature}</div>

      <div className="output">Recovery Bit: {recoveryBit}</div>

      <div className="output">Nonce: {nonce}</div>
    </div>
  );
}

export default Sign;
