const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const summarizeText = require('./summarize.js');

// Middleware to parse JSON bodies (as sent by API clients)
app.use(express.json());

// Middleware to serve static files from the 'public' directory
app.use(express.static('public'));

// Log the access token for debugging
console.log('Access Token:', process.env.ACCESS_TOKEN);

// API ROUTE: /summarize
app.post('/summarize', async (req, res) => {
  try {
    if (!req.body.text_to_summarize) {
      return res.status(400).json({ error: 'Missing required parameter: text_to_summarize' });
    }

    const text = req.body.text_to_summarize;
    const summary = await summarizeText(text);
    res.json({ summary });
  } catch (error) {
    console.error('Error during summarization:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API ROUTE: /health
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
