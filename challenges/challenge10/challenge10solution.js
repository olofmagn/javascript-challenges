const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { fromFile } = require('file-type');

const app = express();

// Allowed image MIME types
const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

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
});

// File upload endpoint
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Validate file content using magic bytes
    const type = await fromFile(req.file.path);
    if (!type || !allowedTypes.includes(type.mime)) {
      fs.unlinkSync(req.file.path); // Delete invalid file
      return res.status(400).json({ message: 'Invalid file type' });
    }

    res.status(200).json({
      message: 'File uploaded successfully',
      file: {
        filename: req.file.filename,
        mimetype: type.mime,
        path: `/uploads/${req.file.filename}`
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.use('/uploads', express.static(uploadDir));

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

