// IMPORT THE STAKECONTRACT ENTITY HERE
import {StakeContract} from "../generated/schema"
import {Address} from "@graphprotocol/graph-ts"
import { Stake as StakeTemplate } from "../generated/templates";
export const STAKE_CONTRACT_ADDRESS = "0x773b036666181361D40Cc63fD2Ab8070003d2Ca5"
export function handleSync(): void {
    let _stake = StakeContract.load(STAKE_CONTRACT_ADDRESS);
    if (_stake == null) {
      _stake = new StakeContract(STAKE_CONTRACT_ADDRESS);
      
      _stake.save();
      StakeTemplate.create(
        Address.fromString(STAKE_CONTRACT_ADDRESS)
      );
    }
}