# Challenge 8

## Vulnerability
The issue here is that the vulnerable source `db.users.find` take a `username` from `reg.body.username` where the input is not properly sanitized.
No framework is used like `express-validator` or such for input validation. The code also provide many error status codes and that would lead to the possiblity to identify an existing user. This is abstracted away, but note also that no password mechanism is present.

## Solution 
Please see the PoC code below:
```
... code

//insert user if valid input are provided in the header
await db.users.insert({username: String (req.body.username), email: String(req.body.email),
  password: encryptPassword(reg.body.password)});

... more code
```

Although there is multiple solutions, the input handling issue is what we are looking for in this question.

