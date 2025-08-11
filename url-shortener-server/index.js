const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/url-shortener', { useNewUrlParser: true, useUnifiedTopology: true });

// Define the URL schema
const urlSchema = new mongoose.Schema({
    original_url: String,
    short_code: { type: String, unique: true },
    visits: { type: Number, default: 0 }
});

const Url = mongoose.model('Url', urlSchema);

// Route to shorten URL
app.post('/api/shorten', async (req, res) => {
    const shortCode = Math.random().toString(36).substring(2, 8);
    const newUrl = new Url({ original_url: req.body.url, short_code: shortCode });
    await newUrl.save();
    res.json({ short_url: `http://localhost:5000/${shortCode}` });
});

// Route to redirect to original URL
app.get('/:shortcode', async (req, res) => {
    const url = await Url.findOne({ short_code: req.params.shortcode });
    if (url) {
        url.visits++;
        await url.save();
        return res.redirect(url.original_url);
    }
    res.status(404).send('Not Found');
});
app.get('/', (req, res) => {
    res.send('URL Shortener API is running 🚀');
});

// Start the server
app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});

// Route to get all URLs
// Route to get all URLs
app.get('/api/urls', async (req, res) => {
    try {
        const urls = await Url.find(); // Fetch all URLs from the database
        res.json(urls); // Send the URLs as a JSON response
    } catch (error) {
        console.error('Error fetching URLs:', error);
        res.status(500).send('Server Error'); // Handle any errors
    }
});

