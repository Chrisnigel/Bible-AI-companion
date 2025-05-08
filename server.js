const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const BIBLE_API_URL = "https://bible-api.com"; // Bible API endpoint

// Endpoint to get Bible verse based on query
app.post("/ask", async (req, res) => {
  const userQuestion = req.body.question;
  if (!userQuestion) {
    return res.status(400).json({ answer: "Please provide a valid question." });
  }

  try {
    // Make API request to Bible-API.com
    const response = await axios.get(`${BIBLE_API_URL}/${userQuestion}`);

    // Format the response
    const bibleVerse = response.data;
    if (bibleVerse && bibleVerse.text) {
      return res.json({
        answer: `Bible Verse: ${bibleVerse.text} (${bibleVerse.reference})`,
      });
    } else {
      return res.json({ answer: "No relevant Bible verse found." });
    }
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ answer: "Error processing your request." });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
