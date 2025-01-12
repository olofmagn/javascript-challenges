// Original code

app.post('/generate-pwd-reset-url', async function (req, res) {

  //assume the customer exist
  const customer = await customerdb.findOne(req.body.email);
  const resetToken = await genPwdResetToken(customer._id);
  const resetPwdUrl = `${req.header('host')}/passwordReset?token=${resetToken}&id=${customer._id}`;

  return res.json({resetPwdUrl: rsetPwdUrl});

});
