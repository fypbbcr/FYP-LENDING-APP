var Web3 = require('web3')
let axios = require('axios')
const BigNumber = require('bignumber.js');
let constants = require('./constants');


let web3 = new Web3(window.ethereum);

let contract=new web3.eth.Contract(constants.abi,constants.contract_address);
let erc20Contract=new web3.eth.Contract(constants.erc20abi,constants.erc20Address);


exports.registerBorrower = async (accounts) => {
    await contract.methods.registerAsBorrower().send({from: accounts , value: web3.utils.toWei('0.02', 'ether') /*** selected account from metamask ***/}) // contract.methods.methodName(parameters).send({from:selected account})
    .on('transactionHash', (hash) => {
        // hash of tx
    }).on('confirmation', function (confirmationNumber, receipt) {
        if (confirmationNumber === 2) {
           // tx confirmed
        }
    })
  
};

exports.removeBorrower = async (accounts) => {
  await contract.methods.removedAsBorrower().send({from: accounts/*** selected account from metamask ***/}) // contract.methods.methodName(parameters).send({from:selected account})
  .on('transactionHash', (hash) => {
      // hash of tx
  }).on('confirmation', function (confirmationNumber, receipt) {
      if (confirmationNumber === 2) {
         // tx confirmed
      }
  })

};

exports.giveApproval = async (accounts) => {
  await erc20Contract.methods.approve(constants.contract_address,web3.utils.toWei('100000000')).send({from: accounts/*** selected account from metamask ***/}) // contract.methods.methodName(parameters).send({from:selected account})
  .on('transactionHash', (hash) => {
      // hash of tx
  }).on('confirmation', function (confirmationNumber, receipt) {
      if (confirmationNumber === 2) {
         // tx confirmed
      }
  })
}


exports.addRequest = async (amount,duration,accounts) => {
  duration = duration * 60
  await contract.methods.requestFundsToBorrow(web3.utils.toWei(amount.toString()),duration).send({from: accounts /*** selected account from metamask ***/}) // contract.methods.methodName(parameters).send({from:selected account})
  .on('transactionHash', (hash) => {
      // hash of tx
  }).on('confirmation', function (confirmationNumber, receipt) {
      if (confirmationNumber === 2) {
         // tx confirmed
      }
  })

};


exports.acceptRequest = async (accounts,id) => {

  await contract.methods.AcceptRequest(id).send({from: accounts /*** selected account from metamask ***/}) // contract.methods.methodName(parameters).send({from:selected account})
  .on('transactionHash', (hash) => {
      // hash of tx
  }).on('confirmation', function (confirmationNumber, receipt) {
      if (confirmationNumber === 2) {
         // tx confirmed
      }
  })

};


exports.ReportBorrower = async (accounts,id) => {

  await contract.methods.ReportBorrower(id).send({from: accounts /*** selected account from metamask ***/}) // contract.methods.methodName(parameters).send({from:selected account})
  .on('transactionHash', (hash) => {
      // hash of tx
  }).on('confirmation', function (confirmationNumber, receipt) {
      if (confirmationNumber === 2) {
         // tx confirmed
      }
  })

};


exports.payBackLoan = async (accounts,id) => {

  await contract.methods.payBackLender(id).send({from: accounts /*** selected account from metamask ***/}) // contract.methods.methodName(parameters).send({from:selected account})
  .on('transactionHash', (hash) => {
      // hash of tx
  }).on('confirmation', function (confirmationNumber, receipt) {
      if (confirmationNumber === 2) {
         // tx confirmed
      }
  })

};


// exports.acceptNegotiatedOffer = async(fromAccount,counter_Id) =>{
//   const transactionParameters = {
//     nonce: '0x00', // ignored by MetaMask
//     gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
//     gas: '0x2710', // customizable by user during MetaMask confirmation.
//     to: constants.contract_address, // Required except during contract publications.
//     from: fromAccount, // must match user's active address.
//     value: '0x00', // Only required to send ether to the recipient from the initiating external account.
//     data:contract.methods.acceptCounterOrder(counter_Id).encodeABI(), // Optional, but used for defining smart contract creation and interaction.
//     chainId: 4, // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
//   };

//   const txHash = await window.ethereum.request({
//     method: 'eth_sendTransaction',
//     params: [transactionParameters],
//   });
// }

// exports.rejectNegotiatedOffer = async(fromAccount,counter_Id) =>{
//   const transactionParameters = {
//     nonce: '0x00', // ignored by MetaMask
//     gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
//     gas: '0x2710', // customizable by user during MetaMask confirmation.
//     to: constants.contract_address, // Required except during contract publications.
//     from: fromAccount, // must match user's active address.
//     value: '0x00', // Only required to send ether to the recipient from the initiating external account.
//     data:contract.methods.cancelCounterOrder(counter_Id).encodeABI(), // Optional, but used for defining smart contract creation and interaction.
//     chainId: 4, // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
//   };

//   const txHash = await window.ethereum.request({
//     method: 'eth_sendTransaction',
//     params: [transactionParameters],
//   });
// }

// exports.buyOrder = async(fromAccount, sell_Id)=>{
//   let price = await contract.methods.SellOrders(sell_Id).call();
//   price=new BigNumber(price)
//   const transactionParameters = {
//     nonce: '0x00', // ignored by MetaMask
//     gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
//     gas: '0x2710', // customizable by user during MetaMask confirmation.
//     to: constants.contract_address, // Required except during contract publications.
//     from: fromAccount, // must match user's active address.
//     value: price, // Only required to send ether to the recipient from the initiating external account.
//     data:contract.methods.buySellOrder(sell_Id).encodeABI(), // Optional, but used for defining smart contract creation and interaction.
//     chainId: 4, // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
//   };

//   const txHash = await window.ethereum.request({
//     method: 'eth_sendTransaction',
//     params: [transactionParameters],
//   });
// }

// exports.negotiateOrder = async(fromAccount, sell_Id , price , comment)=>{
//   if(comment==null){
//     comment=""
//   }
//   const transactionParameters = {
//     nonce: '0x00', // ignored by MetaMask
//     gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
//     gas: '0x2710', // customizable by user during MetaMask confirmation.
//     to: constants.contract_address, // Required except during contract publications.
//     from: fromAccount, // must match user's active address.
//     value: '0x00', // Only required to send ether to the recipient from the initiating external account.
//     data:contract.methods.negotiate(sell_Id,price,comment).encodeABI(), // Optional, but used for defining smart contract creation and interaction.
//     chainId: 4, // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
//   };

//   const txHash = await window.ethereum.request({
//     method: 'eth_sendTransaction',
//     params: [transactionParameters],
//   });
// }



// exports.buyCounterOrder = async(fromAccount, sell_Id)=>{
// //  let price = 50;
//    //price=new BigNumber(price)
//   //price=new BigNumber(price).toString();
//  // console.log(price)
//   const transactionParameters = {
//     nonce: '0x00', // ignored by MetaMask
//     gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
//     gas: '0x2710', // customizable by user during MetaMask confirmation.
//     to: constants.contract_address, // Required except during contract publications.
//     from: fromAccount, // must match user's active address.
//     value: '32', // Only required to send ether to the recipient from the initiating external account.
//     data:contract.methods.buyCounterOrder(sell_Id).encodeABI(), // Optional, but used for defining smart contract creation and interaction.
//     chainId: 4, // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
//   };

//   const txHash = await window.ethereum.request({
//     method: 'eth_sendTransaction',
//     params: [transactionParameters],
//   });
// }
// exports.cancelOffer = async(fromAccount,counterId)=>{


//   const transactionParameters = {
//     nonce: '0x00', // ignored by MetaMask
//     gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
//     gas: '0x2710', // customizable by user during MetaMask confirmation.
//     to: constants.contract_address, // Required except during contract publications.
//     from: fromAccount, // must match user's active address.
//     value: '0x00', // Only required to send ether to the recipient from the initiating external account.
//     data:contract.methods.cancelCounterOrder(counterId).encodeABI(), // Optional, but used for defining smart contract creation and interaction.
//     chainId: 4, // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
//   };

//   const txHash = await window.ethereum.request({
//     method: 'eth_sendTransaction',
//     params: [transactionParameters],
//   });

// }

// exports.increamentQuantity = async(fromAccount,sell_Id,quantity)=>{
//   const maticPOSClient = new MaticPOSClient({
//     network: "testnet",
//     version: "mumbai",
//     parentProvider: window.web3.currentProvider,
//     maticProvider: 'https://rpc-mumbai.maticvigil.com/v1/d325690d7fb7c65dcad3b07fd8b0f0b5c5a18b71'
//   });
//   let rootToken = "0xfe1b6ABc39E46cEc54d275efB4b29B33be176c2A"
//   await maticPOSClient.approveERC20ForDeposit(rootToken, web3.utils.toWei('100000000'),fromAccount );

// }


// exports.decreamentQuantity = async(fromAccount,sell_Id,quantity)=>{
//   const transactionParameters = {
//     nonce: '0x00', // ignored by MetaMask
//     gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
//     gas: '0x2710', // customizable by user during MetaMask confirmation.
//     to: constants.contract_address, // Required except during contract publications.
//     from: fromAccount, // must match user's active address.
//     value: '0x00', // Only required to send ether to the recipient from the initiating external account.
//     data:contract.methods.decreamentQuantity(sell_Id,quantity).encodeABI(), // Optional, but used for defining smart contract creation and interaction.
//     chainId: 4, // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
//   };

//   const txHash = await window.ethereum.request({
//     method: 'eth_sendTransaction',
//     params: [transactionParameters],
//   });  
// }

// exports.getCurrentGasPrices = async () => {
//   try {
//       let response = await axios.get('https://ethgasstation.info/json/ethgasAPI.json')
//       let prices = {
//           low: response.data.safeLow / 10,
//           medium: response.data.average / 10,
//           high: response.data.fast / 10
//       };
//       console.log(prices)
//       return prices;
//   } catch (e) {
//       console.log(e)
//   }

// };

