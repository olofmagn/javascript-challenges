app.get("/api/data", async(req, res) => {
    
  // Specify a list of trustworthy a list of vulnerability. Can you spot another vulnerability here?
  const allowedURL = ["http://whitelistedurl1.com", "http://whitelistedurl2.com"];
  const url = req.query.url;

  // Whitelist only safe domains
  try {
    if (!allowedURL.includes(url)) {
      res.status(400).json({error: "Bad URL"});
    }

    // Then proceed to fetch URL as it is considered safe
    const response = await fetch(url)
    const data =  await reesponse.json();

    res.status(200).json({data: data});

  }

  catch (err) {
    console.log(err)
    res.status(500).json({err: err.msg})
  }
})

