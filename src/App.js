import "./App.css";
import { ethers } from "ethers";
import { useState } from "react";
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import Token from "./artifacts/contracts/Token.sol/Token.json";

const greeterAddress = "0x332A6A758ceb8fb1a1d6aa209790087089EB947a"; //"0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
const tokenAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

const App = () => {
  const [greetingValue, setGreetingValue] = useState();
  const [userAccount, setUserAccount] = useState(
    "0xdD2FD4581271e230360230F9337D5c0430Bf44C0"
  );
  const [amount, setAmount] = useState();

  // console.log("greeter", Greeter.abi);

  const requestAccount = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  };

  const getGreeting = async () => {
    if (typeof window.ethereum !== undefined) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      // const provider = new ethers.providers.Web3Provider(
      //   "https://ropsten.infura.io/v3/20cd146cad2745ce86688c8da16913b3"
      // );

      const contract = new ethers.Contract(
        greeterAddress,
        Greeter.abi,
        provider
      );

      try {
        console.log("contract ------>", contract);
        const data = await contract.greet();
        console.log("data", data);
      } catch (error) {
        console.log("Error", error);
      }
    }
  };

  const setGreeting = async () => {
    if (!greetingValue) return;

    if (typeof window.ethereum !== undefined) {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log("provider---------->", provider);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);
      const transaction = await contract.setGreeting(greetingValue);
      await transaction.wait();
      getGreeting();
    }
  };

  const getBalance = async () => {
    console.log("getBalance");
    console.log("TOken ABI", Token.abi);
    if (typeof window.ethereum !== undefined) {
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(tokenAddress, Token.abi, provider);
      // console.log("token contract", contract);
      const balance = await contract.balanceOf(account);
      console.log("balance", balance.toString());
    }
  };

  const sendCoins = async () => {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
      const transation = await contract.transfer(userAccount, amount);
      await transation.wait();
      console.log(`${amount} Coins successfully sent to ${userAccount}`);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={getGreeting}>Fetch Greeting</button>
        <button onClick={setGreeting}>Set Greeting</button>
        <input
          onChange={(e) => setGreetingValue(e.target.value)}
          placeholder="set greeting"
        />

        <br />
        <br />

        <button onClick={getBalance}>Get Balance</button>
        <input
          placeholder="account id"
          onChange={(e) => setUserAccount(e.target.value)}
          value={userAccount}
        />
        <input
          placeholder="amount"
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={sendCoins}>Send coins</button>
      </header>
    </div>
  );
};

export default App;
