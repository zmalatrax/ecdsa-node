import server from "./server";

function Wallet({
  address,
  setAddress,
  transNb,
  setTransNb,
  balance,
  setBalance,
}) {
  async function onChange(evt) {
    const address = evt.target.value;
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
      const {
        data: { transNb },
      } = await server.get(`transCount/${address}`);
      setTransNb(transNb);
    } else {
      setBalance(0);
      setTransNb(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Wallet Address
        <input
          placeholder="Type an address, for example: 0x1"
          value={address}
          onChange={onChange}
        ></input>
      </label>

      <div className="inline-output">Balance: {balance}</div>

      <div className="inline-output">Transaction Count: {transNb}</div>
    </div>
  );
}

export default Wallet;
