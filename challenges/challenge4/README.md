# Challenge 4

## Vulnerability

The issue lies in the below code:
```
if (SOMEOBJECT)[token] && token) {
        return res.send("true")
 }
```

1. `SOMEOBJECT[token]` checks if the property corresponding to the value of `token` exist on `SOMEOBJECT`
2. `token` is checked to ensure it is truthy.
3. if both conditions are `true`, it responds with `"true"`.

```
if(SOMEOBJECT)[__proto__] && token) {
    return res.send("true")
}
```
The use of `__proto__` in JavaScript is potentially vulnerable because it allows access to an objects prototype chain. This can lead to prototype pollution if the code improperly manipulates or relies on this property without sufficent safeguards.

### Issues with the provided code snippet
1. Prototype pollution: If `SOMEOBJECT` is a user-controlled object, an attacker could use `__proto__` property to inject properties into the prototype chain. For instance, setting `SOMEOBJECT['__proto__'] to an object with malicious properties or functions can cause unexpected behavior in otherparts of the application. For example:

```
const SOMEOBJECT = {};
SOMEOBJECT['__proto__'] = { isAdmin: true };

// Now all objects inherit `isAdmin` as a property:
console.log({}.isAdmin); // true
```

This can be exploited to overwrite important properties or methods in the global environment, leading to privilege escalation, denial of service, or other attacks.

## Solution
First it is a good measure to create a object without a prototype:
```
const SOMEOBJECT = Object.create(null);
```
Then check the structure of the token provided by the user to ensure it is sound when arriving.
Please see the PoC code below:

```
 const rawToken = req.header('token');
  if (!rawToken || !isBase64(rawToken)) {
    return res.status(400).send("Invalid token");
  }

    if(SOMEOBJECT.hasOwnProperty(token) && token) {
      return res.send("true");
    }
  }

... more code
```
