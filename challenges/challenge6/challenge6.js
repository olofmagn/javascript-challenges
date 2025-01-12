// Original code
const emailRegex = "some values here"

app.post('/validateEmail', (req, res) => {
  const email = req.body.email;
  if(!email || !emailRegex.emailRegex(email)) {
    return res.status(400).send({error: 'invalid email'});
  }

  return  req.status(200).send({valid:true});
});

