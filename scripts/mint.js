
require('dotenv').config();
const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/MaticShiba.sol/MaticShiba.json");
const contractAddress = "0x6e45A324b90F248ccDc5b1812642e29C718E149A";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function mint() {
  var nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //get latest nonce
  const val = 1; // this guy
  var weiAmount = web3.utils.toWei(''+val,"ether");
  console.log('wei: ', val, weiAmount);
  
  //the transaction
  const tx = {
    value: weiAmount,
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 125000,
    data: nftContract.methods.mint().encodeABI(),
  };

  console.log('tx: ', tx);

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" Promise failed:", err)
    })
}

mint()
