// Original code
export function checkToken(useSupplied) {
  const account = account.retrieveToken(userSupplied)

  if(account) {
    // Checks for token input and validate that with the information stored in the backend
    if(account.service.token === user.service.token) {
      return true;
    }
  }
  return false;
};
