import { BorrowerRequestAdded, BorrowerRequestAccepted, BorrowerRequestReported, BorrowerRequestCompleted } from '../generated/Lending/Lending'
import { Requests,Borrow } from '../generated/schema'
import { BigDecimal } from "@graphprotocol/graph-ts"

// export function handleNewGravatar(event: NewGravatar): void {
//   let gravatar = new Gravatar(event.params.id.toHex())
//   gravatar.owner = event.params.owner
//   gravatar.displayName = event.params.displayName
//   gravatar.imageUrl = event.params.imageUrl
//   gravatar.save()
// }

export function handleRequestAdded(event: BorrowerRequestAdded): void{
    // let request = Requests.load(event.params.id.toHex());
    
    let request = new Requests(event.params.id.toHex())

    request.borrower = event.params.borrower;
    request.amount = BigDecimal.fromString(event.params.amount.toString());
    request.duration = BigDecimal.fromString(event.params.timeStampDuration.toString());
    request.status = "Pending";

    request.save();

   let nrequest = new Borrow(event.params.id.toHex())

    nrequest.borrower = event.params.borrower;
    nrequest.amount = BigDecimal.fromString(event.params.amount.toString());
    nrequest.duration = BigDecimal.fromString(event.params.timeStampDuration.toString());
    nrequest.status = "Pending";

    nrequest.save();
    


}

export function handleRequestAccepted(event: BorrowerRequestAccepted): void{
  // let request = Requests.load(event.params.id.toHex());
  
  let request = Borrow.load(event.params.id.toHex())

  request.lender = event.params.lender;
  request.startingTime = BigDecimal.fromString(event.params.startingTimeStamp.toString());
  request.status = "ON Going"

  request.save();
  


}

export function handleRequestReported(event: BorrowerRequestReported): void{
  // let request = Requests.load(event.params.id.toHex());
  
  let request = Borrow.load(event.params.id.toHex())

  request.status = "Reported"

  request.save();

}

export function handleRequestCompleted(event: BorrowerRequestCompleted): void{
  // let request = Requests.load(event.params.id.toHex());
  
  let request = Borrow.load(event.params.id.toHex())

  request.status = "Completed"

  request.save();

}

// export function handleUpdatedGravatar(event: UpdatedGravatar): void {
//   let id = event.params.id.toHex()
//   let gravatar = Gravatar.load(id)
//   if (gravatar == null) {
//     gravatar = new Gravatar(id)
//   }
//   gravatar.owner = event.params.owner
//   gravatar.displayName = event.params.displayName
//   gravatar.imageUrl = event.params.imageUrl
//   gravatar.save()
// }
