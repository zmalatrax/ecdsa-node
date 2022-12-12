const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "d4f3dd5c4b4596d9a40f": 100,
  "627ae1a9e97ad98fa229": 50,
  "29cfd3dec8a1f2df0aa1": 75,
};

const transCount = {
  "d4f3dd5c4b4596d9a40f": 1,
  "627ae1a9e97ad98fa229": 0,
  "29cfd3dec8a1f2df0aa1": 5,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.get("/transCount/:address", (req, res) => {
  const { address } = req.params;
  const transNb = transCount[address] || 0;
  res.send({ transNb });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
