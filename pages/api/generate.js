export default async function handler(req, res) {
  try {
    const { idea } = req.body;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: idea }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    // 👇 RETURN RAW RESPONSE
    res.status(200).json({
      output: JSON.stringify(data, null, 2),
    });

  } catch (err) {
    res.status(500).json({
      output: "Server error: " + err.message,
    });
  }
}
