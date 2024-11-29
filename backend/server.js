const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 3000;
require('dotenv').config();

// Enable CORS for your frontend
app.use(cors());

app.get('/api/search', async (req, res) => {
  const query = req.query.query;
  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }
  const apiKey = process.env.VITE_SERPAPI_API_KEY; // Add your API key here
  try {
    const response = await axios.get(`https://serpapi.com/search`, {
      params: {
        engine: 'google_shopping',
        api_key: apiKey,
        google_domain: 'google.co.in',
        gl: 'in',
        hl: 'en',
        location: 'India',
        q: query
      }
    });
    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
