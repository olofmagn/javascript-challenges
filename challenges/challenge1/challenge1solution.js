import React from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";

export default function Root() {
  return (<Router> <QueryParamsDemo/> </Router>);
}

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search])};
}

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

function QueryParamsDemo() {
  let query = useQuery();

  return (
    <div>
    <h2> Return Home </h2>
    // Make sure we never leave the page using the validateUrl call
    <a href={validateUrl(query.get("redirect"))}>Click to go home</a>
    </div>
  );
}

// The issue lies in query() parameter where a user can control input and  redirect output to an malicious site or possible craft an XSS attack
// Both redirect=<script>alert('xss')</script> or redirect=http://malicious.com might be possible based on current context
