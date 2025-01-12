const validator = require('validator');

app.post('/generate-pwd-reset-url', async function (req, res) {
  const { email } = req.body;
    
  // Checks that we have a valid email and the email is validated correctly
  if (!email || !validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  const customer = await customerDb.findOne({ email });
  // Check if we have a valid customer
  if (!customer) {
    return res.status(404).json({ error: "User not found" });
  }

  const resetToken = await genPwdResetToken(customer._id);
  const baseUrl = process.env.APP_BASE_URL || 'https://yourapp.com';
  const resetPwdUrl = `${baseUrl}/passwordReset?token=${resetToken}`;

  return res.json({ resetPwdUrl });
});

