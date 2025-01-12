# Challenge 3
## Vulnerability
- Checks for tokeninput and validates that in the backend.
- Once we get one valid input --> the next will take longer.
- Possible timing attack here. As every char gets evaluated sequentially `a = a`, `b = b`, `c = c`.
- Then timing can be observed by comparing the inputs with respective outputs.

The pseudocode below illustrates how a potentially insecure comparison function (on server) might look like:
```
FUNCTION insecure_compare(input, secret):
    IF LENGTH(input) ≠ LENGTH(secret):
        RETURN False
    FOR i FROM 0 TO LENGTH(secret) - 1:
        IF input[i] ≠ secret[i]:
            RETURN False
        WAIT 10 milliseconds     // Intentional or unintentional delay
    RETURN True
```

Because the comparison exists early, more correct characters = longer response time where the attacker abuses this by timing how long each guess takes as input.

## Solution
- One measures is to implement `crypto.timingSafeEqual` to avoid these char comparisons and that the whole string gets evaluated.
Please see the PoC code below:

```
  if(account) {
    //Implement crypto.timingSafeEqual to avoid nonconstant comparisons
    if(crypto.timingSafeEqual(account.service.token === user.service.token)) {
      return true;
    }
  }
  return false;
};
```
