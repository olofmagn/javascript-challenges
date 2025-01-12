// Original code
const SOMEOBJECT = {}

app.get("/validateToken", (req, res) => {
  if (req.header('token')) {
    const token = Buffer.from(req.header('token'), 'base64')

    if(SOMEOBJECT[token] && token) {
      return res.send("true");
    }
  }
  return res.send("false");
});
