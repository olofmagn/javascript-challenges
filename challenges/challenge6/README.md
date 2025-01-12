# Challenge 6
## Vulnerability
The issue here `post` takes a request and validates using a custom regex pattern.
This can be abused by entering a wide array of strings towards the validator function.

```
const emailRegex = "some values here"

app.post('/validateEmail', (req, res) => {
  const email = req.body.email;
  if(!email || !emailRegex.emailRegex(email)) {
    return res.status(400).send({error: 'invalid email'});
  }

  return  req.status(200).send({valid:true});
});
```

## Solution
- The solution here is to use `validator` function to ensure that the email is properly santized.
Please see the PoC code below:
```
const validator = require('validator')

app.post('/validateEmail', (req, res) => {
  const email = req.body.email;
  //Evaluates if the email follows a certain regex pattern using validator instead
  if(!email || !Validator(email)) {
    return res.status(400).send({error: 'invalid email'});
  }
```

