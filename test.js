require("dotenv").config();
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

(async () => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Give a Bible verse about love." }],
    });

    console.log("✅ Response:", response.choices[0].message.content);
  } catch (err) {
    console.error("❌ Error:", err.message || err);
  }
})();
