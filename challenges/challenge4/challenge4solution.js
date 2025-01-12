// Creating a object without a prototype
const SOMEOBJECT = Object.create(null);

app.get("/validateToken", (req, res) => {
  
  // Make sure that the token is valid before performing any property checks
  const rawToken = req.header('token');
  if (!rawToken || !isBase64(rawToken)) {
    return res.status(400).send("Invalid token");
  }

    if(SOMEOBJECT.hasOwnProperty(token) && token) {
      return res.send("true");
    }
  }
  return res.send("false");
});

