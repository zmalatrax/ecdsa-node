import { useState } from "react";
import server from "./server";

import { toHex } from "ethereum-cryptography/utils";
import * as secp from "ethereum-cryptography/secp256k1";

function Transfer({
  address,
  sendAmount,
  recipient,
  setBalance,
  msgHash,
  signature,
  recoveryBit,
  nonce,
  transNb,
  setTransNb,
}) {
  const [signingAddress, setSigningAddress] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    try {
      // Check if transaction signer address is wallet address
      const recovPublicKey = secp.recoverPublicKey(
        msgHash,
        signature,
        recoveryBit
      );
      const signingAddress = toHex(recovPublicKey).slice(-20);
      setSigningAddress(signingAddress);
      if (signingAddress === address) {
        if (nonce === transNb) {
          const {
            data: { balance },
          } = await server.post(`send`, {
            sender: address,
            amount: parseInt(sendAmount),
            recipient,
          });
          transNb += 1;
          setBalance(balance);
          setTransNb(transNb);
        } else {
          throw {
            name: "alreadyDone",
            message: "Transaction has already been performed",
          };
        }
      } else {
        throw {
          name: "wrongPrivKey",
          message: "Wrong Private Key",
        };
      }
    } catch (ex) {
      if (ex.name == "alreadyDone" || ex.name == "wrongPrivKey")
        alert(ex.message);
      else alert(ex.response.data.message);
    }
  }

  return (
    <div className="container transfer">
      <h1>Send Transaction</h1>

      <div className="output" readOnly={true}>
        Transaction Signature: {signature}
      </div>

      <div className="output" readOnly={true}>
        Recovered Signing Address : {signingAddress}
      </div>
      <form className="transfer" onSubmit={transfer}>
        <input type="submit" className="button" value="Transfer" />
      </form>
    </div>
  );
}

export default Transfer;
