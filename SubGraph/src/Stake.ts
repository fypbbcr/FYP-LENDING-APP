import { BigDecimal, BigInt } from "@graphprotocol/graph-ts"
import {
  Staked,
  RewardPaid
} from "../generated/templates/Stake/Stake"
import {Userstake,StakeHistory,User} from "../generated/schema"

export function handleStake(event: Staked): void {
    let newStake = false;
    let userStake = Userstake.load(event.params.user.toHexString())
  
    if(userStake == null){
      userStake = new Userstake(event.params.user.toHexString())
      userStake.stakedAmount = BigDecimal.fromString("0");
      userStake.staker = event.params.user;
      newStake = true;
    }
    userStake.stakedAmount = userStake.stakedAmount.plus(BigDecimal.fromString(event.params.amount.toString()))


    
  
  
      let history = new StakeHistory(event.params.user.toHexString() +  event.block.timestamp.toHexString())
      history.stakedAmount = BigDecimal.fromString(event.params.amount.toString());
      history.staker = event.params.user;
      history.stakedTime = event.block.timestamp;
  
      let user = User.load(event.params.user.toHex())
  
      if(user == null){
        user = new User(event.params.user.toHex())
        user.address = event.params.user
        user.liquidity = []
        user.history = []
        user.stakes = []
        user.historyStake = []
      }
      if(newStake){
        let temp1 = user.stakes;
        temp1.push(userStake.id);
      }
      let temp2 = user.historyStake;
      temp2.push(history.id);
  
      userStake.save()
      history.save()
      user.save()
  
      
  
  }
  
  export function handleUnstake(event: RewardPaid): void {
    let userStake = Userstake.load(event.params.user.toHexString())
  
    userStake.stakedAmount = userStake.stakedAmount.minus(BigDecimal.fromString(event.params.amountUnstake.toString()))
    userStake.save()

    
  }
  