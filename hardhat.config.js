require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

// import * as dotenv from "dotenv";
// import { HardhatUserConfig } from "hardhat/config";

// dotenv.config();
/* This loads the variables in your .env file to `process.env` */

// const { DEPLOYER_PRIVATE_KEY, INFURA_PROJECT_ID } = process.env;

module.exports = {
  solidity: "0.8.3",
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/20cd146cad2745ce86688c8da16913b3`,
      accounts: [
        `0x1850688505c76f85396afdb3d32e47644ebf20850ae6939de2ff73ac485c9526`,
      ],
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/20cd146cad2745ce86688c8da16913b3`,
      accounts: [
        `0x1850688505c76f85396afdb3d32e47644ebf20850ae6939de2ff73ac485c9526`,
      ],
    },
  },
};

// Try running some of the following tasks:
//   npx hardhat accounts
//   npx hardhat compile
//   npx hardhat test
//   npx hardhat node
//   node scripts/sample-script.js
//   npx hardhat help
