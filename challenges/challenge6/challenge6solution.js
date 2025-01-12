// Import valdiation library
const validator = require('validator')

app.post('/validateEmail', (req, res) => {
  const email = req.body.email;
  //Evaluates the email input using the library validator instead
  if(!email || !Validator(email)) {
    return res.status(400).send({error: 'invalid email'});
  }

  return  req.status(200).send({valid:true});
});

