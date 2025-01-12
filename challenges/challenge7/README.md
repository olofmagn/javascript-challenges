# Challenge 7

## Vulnerability
The issue is that the secret key that is used to signing JWT is leaked in the source code. `const secret = my-super-duper-secret key`. This means that anyone with access to the source code has the possibility to authenticate with the target system through this `const token = jwt.sign(user,secret)`.

## Solution
The solution here is to load the secret from `process.env` instead.
This means that the secret will not be visible in the source code but rather loaded from the environment.

Please see the PoC code below:

```
  // Sign *JWT with user ID and secret key and serialize this using env.
  const token = jwt.sign(process.env.SECRET, user)
```

They keytake from this challenge is that vulnerabilities also can be easy to identify.
