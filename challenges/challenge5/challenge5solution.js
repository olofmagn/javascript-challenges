app.post('/user', (req, res) => {

  //Checks that we identify a string datatype
  if (typeof(req.body.name) !== 'string') {
    return res.status(400).json({message: "Invalid username format})
  }

  db.collection('users').find({
    "username": req.body.username,
  }, (err, result) => {
    if (err || !result) {
      return res.status(500).send({ message: 'There was an error finding user'});
    }
    else {
      res.status(200).send(result);
    }
  });
});

// Trying to find username that is matching the thing in the request
// If we find it, we send it back otherwise false
// It is not obvious if that req.body.username needs to be a string value
