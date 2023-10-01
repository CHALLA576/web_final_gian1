require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const AWS = require('aws-sdk');
const cors = require('cors');
const sharp = require('sharp');
const path = require('path');
const User = require("./model/user")
const User2 =require("./feedback/data")

const app = express();
app.use(cors());
app.use(express.json()); // To parse the incoming request's body

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.log('MongoDB is connected');
});

mongoose.connection.on('error', (err) => {
    console.error('Failed to connect to MongoDB:', err);
});



app.post('/login', (req, res) => {
    User.findOne({ email: req.body.email })
        .then((response) => {
            if (response.password === req.body.password) {
                res.send({ message: "login successfully", status: 200 })
            } else {
                res.send({ message: "password wrong" })
            }
        })
        .catch((err) => {
            console.error(err);
            res.send({ message: "user not found" })
        })
});

app.post('/register', async (req, res) => {
    User.findOne({ email: req.body.email })
        .then((response) => {
            if (response) {
                res.send({ message: "email already existed" })
            } else {
                let data = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    phonno: req.body.phonno
                })
                data.save()
                    .then(() => {
                        res.send({ message: "register successfully" })
                    })
                    .catch((err) => {
                        console.error(err);
                        res.send({ message: "register not possible at the moment" })
                    })
            }
        })
});

app.post('/feedback', async (req, res) => {
    User2.findOne({ email: req.body.email })
        .then((response) => {
            if (response) {
                res.send({ message: " email is already used" })
            } else {
                let newscema = new User2({
                    name: req.body.name,
                    email: req.body.email,
                    feedback: req.body.feedback,
                    phonNo: req.body.phonNo
                })
                newscema.save()
                    .then(() => {
                        res.send({ message: "we got your feedback" })
                    })
                    .catch((err) => {
                        console.error(err);
                        res.send({ message: "try some else" })
                    })
            }
        })
});

const ImageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    }
});

const Image = mongoose.model('Image', ImageSchema);

// AWS SDK setup
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        // Compress image using sharp
        const compressedImage = await sharp(req.file.buffer).rotate().resize(800).jpeg({ quality: 70 }).toBuffer();


        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: req.file.originalname,
            Body: compressedImage,
            ContentType: 'image/jpeg',
            CacheControl: 'max-age=31536000' // Cache for a year
        };

        s3.upload(params, async (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }

            // Save the URL to the database
            const image = new Image({ url: data.Location });
            await image.save();

            res.send(data.Location);
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred during image upload.");
    }
});

app.get('/images', async (req, res) => {
    try {
        const images = await Image.find();
        const urls = images.map(image => image.url);
        res.json(urls);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});






const FamilyImageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    familyMember: {
        type: String,
        required: true
    }
});

const FamilyImage = mongoose.model('FamilyImage', FamilyImageSchema);

app.post('/family/upload', upload.single('familyImage'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No family image uploaded.');
        }

        const compressedImage = await sharp(req.file.buffer).rotate().resize(800).jpeg({ quality: 70 }).toBuffer();

        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `family/${req.file.originalname}`, 
            Body: compressedImage,
            ContentType: 'image/jpeg',
            CacheControl: 'max-age=31536000'
        };

        s3.upload(params, async (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }

            // Before saving, ensure we have a familyMember from the request
            if(!req.body.familyMember) {
                return res.status(400).send('Family member identifier is missing.');
            }

            const familyImage = new FamilyImage({ url: data.Location, familyMember: req.body.familyMember });
            await familyImage.save();

            res.send(data.Location);
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred during family image upload.");
    }
});

app.get('/family/images', async (req, res) => {
    try {
        const familyImages = await FamilyImage.find();
        res.json(familyImages);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});









// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Catch-all route to return the React app for unknown requests
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
