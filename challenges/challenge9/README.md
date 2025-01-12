# Challenge 9

## Vulnerability
If the request is intercepted or manipulated by an attacker, the password reset link could redirect to a site of their choice, potentially tricking the user into entering their credentials on a phishing site. The issue is that there is no framework or constructs that validates these input fields.

## Solution 
We can use `validator.js` and `isEmail` to return valid email string to ensure soundness.
Please see the PoC code below:

```
const validator = require('validator');

app.post('/generate-pwd-reset-url', async function (req, res) {
  const { email } = req.body;

  // Checks that we have a valid email and the email is validated correctly
  if (!email || !validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

... more code
```
