# Challenge 1
## The vulnerability
- The issue lies in `query()` parameter where an open-redirect is idenfied. 
- Redirect is the query parameter and the value can be something really different compared to what is intended.
- Both `redirect=<script>alert('xss')</script>` or `redirct=http://malicious.com/malicious.js` are feasible in this context.
- The thing we are looking for here is that there is no input sanitizing logic is present when looking into the code.

```
function QueryParamsDemo() {
  let query = useQuery();

  return (
    <div>
    <h2> Return Home </h2>
    <a href={query.get("redirect")}>Click to go home</a>
    </div>
  );
}
```

## Solution
- The solution here is to add measures that resolves relative URLs safely. 
Please see the PoC code below: 

```
function validateUrl(url) {
try {
    const userSuppliedUrl = new URL(url, window.location.origin); // Resolves relative URLs safely
    if(userSuppliedUrl.origin === window.location.origin) {
      // Safe to use since it is on the same origin
      return userSuppliedUrl.pathname + userSuppliedUrl.search + userSuppliedUrl.hash;
    }
  }
  catch (e) {
    console.warn("Invalid redirect URL", e);
  }
  return "/"; // Redirects to root if invalid or unsafe
}

... more code
```

Another solution to this problem would be to define origins to enforce these restrictions.
