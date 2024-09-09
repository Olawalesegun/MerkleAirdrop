import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { config as configDotenv } from "dotenv";

configDotenv();

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    "lisk-sepolia": {
      url: process.env.LSK_SEP_URL,
      accounts: process.env.PRIV_KEY ? [process.env.PRIV_KEY] : [],
    }
  }
}

export default config;
