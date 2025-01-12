import { encryptPassword} from "./utils./password";

app.post('/signup', function (req,  res) {
  db.users.find({
    //Potential issue issue here. req.body.username needs to be validated as a string
    "username": req.body.username,
  }, async (err, result) => {
    if (err) {
      return res.status(500).json({msg: "Error"});
    }
    else if(result.length == 0) {
      //insert user if valid input are provided in the header
      await db.users.insert({username: String (req.body.username), email: String(req.body.email), 
        password: encryptPassword(reg.body.password)});
      return res.status(200);
    }
    else {
      return res.status(409);
    }
  });
});
