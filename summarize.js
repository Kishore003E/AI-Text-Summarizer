const axios = require('axios');
require('dotenv').config();

async function summarizeText(text) {
  // Log the access token to verify it's being loaded correctly
  console.log('Access Token:', process.env.ACCESS_TOKEN);

  let data = JSON.stringify({
    "inputs": text,
    "parameters": {
      "max_length": 100,
      "min_length": 30
    }
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
    },
    data : data
  };

  try {
    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));
    return response.data[0].summary_text;
  } catch (error) {
    console.error('API response error:', error.response ? error.response.data : error.message);
    throw new Error('Failed to summarize text');
  }
}

module.exports = summarizeText;
