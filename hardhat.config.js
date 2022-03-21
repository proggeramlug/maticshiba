/**
* @type import('hardhat/config').HardhatUserConfig
*/

require('dotenv').config();

require("@nomiclabs/hardhat-ethers");
require('@openzeppelin/hardhat-upgrades');


const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
   solidity: "0.8.3",
   defaultNetwork: "matic",
   networks: {
      hardhat: {},
      matic: {
         url: API_URL,
         //gas: 592983,
        //gas: 4712388,
        //gasPrice: 211000000000,
       // gasPrice: 165000000000,
         accounts: [`0x${PRIVATE_KEY}`]
      },
      testnet: {
          url: API_URL,
          accounts: [`0x${PRIVATE_KEY}`]
      }
   },
}