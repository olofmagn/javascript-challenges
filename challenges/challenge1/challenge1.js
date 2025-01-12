// Original code
import React from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";

export default function Root() {
  return (<Router> <QueryParamsDemo/> </Router>);
}

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search])};
}

function QueryParamsDemo() {
  let query = useQuery();

  return (
    <div>
    <h2> Return Home </h2>
    <a href={query.get("redirect")}>Click to go home</a>
    </div>
  );
}
