# Challenge 5
## Vulnerability
- The issue here is that `req.body.user` can contain arbitary input by the user. There is hence no proper input sanitization.
- One measure is to evaluate if `typeof(req.body.username) !== String` before we proceed with additional procedures.

```
 db.collection('users').find({
    "username": req.body.username,
  }, (err, result) => {
    if (err || !result) {
      return res.status(500).send({ message: 'There was an error finding user'});
    }
    else {
      res.status(200).send(result);
```

# Solution 
Please see the PoC code below:

```
 // Checks that we identify a string datatype in the request
  if (typeof(req.body.name) !== 'string') {
    return res.status(400).json({message: "Invalid username format})
  }

```

