require('dotenv').config()
const jwt = require('jsonwebtoken');

// Vulnerable and leaks the secret.
// const secret = 'my-super-duper-secret-key';

app.post('/login', (req, res) => {
  //Assuming that the auth happens succesfully and the following  user is returned from the DB.

  const user = { id: 123, name: 'John Doe'};

  // Sign *JWT with user ID and secret key and serialize this using env.
  const token = jwt.sign(process.env.SECRET, user)

  // Send JWT back to client
  res.json({ token: token });
}
);
