import React,{useEffect} from "react";


import { useWeb3React } from "@web3-react/core";
import { injected } from "./Connectors";
// import { useEffect } from "react";
let functions=require('./utils/functions');

export default function Home() {
  const context = useWeb3React();
  const {
    connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error,
  } = context;

  let amount;
  let duration;
  let ID1;
  let ID2;
  let ID3;
   

  // useEffect(async() => {
  //   if(context.chainId==undefined){
  //   console.log("connectWallet");
  //   await activate(injected);
  //   }
  // }, [context]);

  const connectWalletButton = async() => {
    console.log(context.account)
    await activate(injected);
   

  };

  const killWalletSession = () => {
    console.log(context.active)
    if(context.active){
    connector.close();
    }
  };

  const deactivateWallet = () => {
    console.log("Current context", context);
    if(context.active){
    context.deactivate();
    }
  };

  function handeleAmount(event){
    amount=event.target.value;
    console.log("amount",amount)
  }

  function handleDuration(event){
    duration=event.target.value;
    console.log("duration",duration)
  }

  function handleID1(event){
    ID1=event.target.value;
    console.log("ID1",ID1)
  }

  function handleID2(event){
    ID2=event.target.value;
    console.log("ID2",ID2)
  }

  function handleID3(event){
    ID3=event.target.value;
    console.log("ID3",ID3)
  }

  
  function registerBorrower(){
    functions.registerBorrower(context.account)
  }

  function removeBorrower(){
    functions.removeBorrower(context.account)
  }

  function requestFunds(){
    functions.addRequest(amount,duration,context.account)
  }

  function giveApproval(){
    functions.giveApproval(context.account);
  }

  function acceptRequest(){
    functions.acceptRequest(context.account,ID1)
  }

  function reportRequest(){
    functions.ReportBorrower(context.account,ID2)
  }
  function payBack(){
    functions.payBackLoan(context.account,ID3);
  }

  return (
    <div>
      <button onClick={connectWalletButton}>Connect Wallet</button>
      <p>{context.account}</p>
      <button onClick={giveApproval}>Give giveApproval</button>
      <h1>Register Borrower</h1>
  
      <button onClick={registerBorrower}>Register</button>
      <br/><br/><br/>

      <h1>Remove Yourself as Borrower</h1>
  
  <button onClick={removeBorrower}>Remove</button>
  <br/><br/><br/>

      <h1>Add Lending Request</h1>
      <label>
      Amount
    <input type="number" name="name" onChange={handeleAmount.bind(this)}/>
  </label>

  <label>
      Duration in Minutes
    <input type="text" name="name" onChange={handleDuration.bind(this)}/>
  </label>
  <br/>
      <button onClick={requestFunds}>Enter</button>

      <br/><br/><br/>

      <h1>Accept Lending Request</h1>
      <label>
      ID
    <input type="text" name="name" onChange={handleID1.bind(this)}/>
  </label>

  <br/>
      <button onClick={acceptRequest}>Enter</button>

      <br/><br/><br/>

<h1>Report Request</h1>
<label>
ID
<input type="text" name="name" onChange={handleID2.bind(this)}/>
</label>

<br/>
<button onClick={reportRequest}>Enter</button>


<h1>Payback Loan</h1>
<label>
ID
<input type="text" name="name" onChange={handleID3.bind(this)}/>
</label>

<br/>
<button onClick={payBack}>Enter</button>
    </div>
    
  );
}
