// Original code
const jwt = require('jsonwebtoken');
const secret = 'my-super-duper-secret-key';

app.post('/login', (req, res) => {
  //Assuming that the auth happens succesfully and the following user is returned from the DB.

  const user = { id: 123, name: 'John Doe'};

  // Sign *JWT with user ID and secret key
  const token = jwt.sign(user, secret);

  // Send JWT back to client
  res.json({ token });
}

);
