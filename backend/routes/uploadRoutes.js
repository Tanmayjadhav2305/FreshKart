const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'freshkart',
        allowed_formats: ['jpg', 'png', 'jpeg'],
    },
});

const upload = multer({ storage: storage });

// Basic error handling wrapper
router.post('/', (req, res, next) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            console.error('Cloudinary Upload Error:', err);
            return res.status(500).json({ message: 'Image upload failed', error: err.message });
        }
        if (!req.file) {
            console.error('No file received');
            return res.status(400).json({ message: 'No file uploaded' });
        }
        console.log('File uploaded successfully to:', req.file.path);
        res.send(req.file.path);
    });
});

module.exports = router;
