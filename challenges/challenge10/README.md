# Challenge 10

## Vulnerability
-  The main vulnerability is that it allows any file to be uploaded without checking the file content or type, aside from its extension. This means that an attacker can upload a malicious file, such as a `.bat` (batch file) or `.php` (PHP script) which could then be executed on the server.
- Can you spot the other vulnerabilities?

```
const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];

// Modify the multer configuration to check MIME type
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Only image files are allowed'), false);
    }
    cb(null, true);
  }
});
```

- Validating only file.mimetype (from the client) is not enough — attackers can bypass the MIME types and upload non-image files with a `.jpg` extension.
- No specified file size limit: Attacker can upload a file with a arbitary size.

## Solution
Please see some PoC code below:
```
// Set up multer with file filter and size limit
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
  fileFilter: function (req, file, cb) {
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Only image files are allowed'));
    }
    cb(null, true);
  }
})
```

```
  // Validate file content using magic bytes
    const type = await fromFile(req.file.path);
    if (!type || !allowedTypes.includes(type.mime)) {
      fs.unlinkSync(req.file.path); // Delete invalid file
      return res.status(400).json({ message: 'Invalid file type' });
    }
```
Possible lessons:
- Use a trusted image type checker to verify the files.
- Apply defensive programming in those scenarios.
