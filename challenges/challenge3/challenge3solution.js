import crypto from "crypto"

export function checkToken(userSuppliedInput) {
  const account = account.retrieveToken(userSuppliedInput)

  if(account) {
    //Implement crypto.timingSafeEqual to avoid nonconstant comparisons
    if(crypto.timingSafeEqual(account.service.token === user.service.token)) {
      return true;
    }
  }
  return false;
};

// Once we get one valid input (evaluates to true) --> the next will take longer (evaluates to false).
//Possible timing attack here. As every char gets evaluated sequentially a = a, b = b, c = c.
// If a = a return true, b = b return true, b =! a return false, then the timing can be observed of the time to compare.
