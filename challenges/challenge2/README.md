# Challenge 2

## Vulnerability
- The issue lies in `app.get("/api/data", async(req, res)` where an attacker can query internal resources as the server do not provide any proper security measures on how to control this particular input. Hence, the server will just return the data without performing any additional security checks.
- There is also another vulnerability present here that is pretty significant. Can you spot it?

```
app.get("/api/data", async(req, res) => {
 const url = req.query.url;
  try {
    const response = await fetch(url)
    const data =  await response.json();

    res.status(200).json({data: data});
    }

.... more code
```

## Solution
The solution in this challenge is to add whitelist domains to avoid SSRF vulnerability to query internal resources.
Please see the PoC code below:

```
  const allowedURL = ["http://whitelistedurl1.com", "http://whitelistedurl2.com"];
  const url = req.query.url;

  // Whitelist only safe domains to query the API
  try {
    if (!allowedURL.includes(url)) {
      res.status(400).json({error: "Bad URL"});
    }
```
