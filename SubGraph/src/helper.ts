import {Address } from "@graphprotocol/graph-ts";
import { ERC20 } from "../generated/Contract/ERC20";
import {ERC20SymbolBytes} from "../generated/Contract/ERC20SymbolBytes";

export function fetchTokenSymbol(tokenAddress: Address): string {
    let contract = ERC20.bind(tokenAddress);
    let contractSymbolBytes = ERC20SymbolBytes.bind(tokenAddress);
    let symbolValue = "unknown";
    let symbolResult = contract.try_symbol();
    if (symbolResult.reverted) {
      let symbolResultBytes = contractSymbolBytes.try_symbol();
      if (!symbolResultBytes.reverted) {
        if (
          symbolResultBytes.value.toHexString() !==
          "0x0000000000000000000000000000000000000000000000000000000000000001"
        ) {
          symbolValue = symbolResultBytes.value.toString();
        }
      }
    } else {
      symbolValue = symbolResult.value;
    }
    return symbolValue;
  }

  
