// Original code

app.post('/signup', function (req,  res) {
  db.users.find({
    "username": req.body.username,
  }, async (err, result) => {
    if (err) {
      return res.status(500).json({msg: "Error"});
    }
    else if(result.length == 0) {
      //insert user
      await db.users.insert(req.body);
      return res.status(200);
    }
    else {
      return res.status(409);
    }
  });
});
