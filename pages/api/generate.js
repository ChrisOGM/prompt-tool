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
              parts: [
                {
                  text: `Turn this into a high-converting AI prompt:\n\n${idea}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    const output =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response";

    res.status(200).json({ output });

  } catch (err) {
    res.status(500).json({
      output: "Server error: " + err.message,
    });
  }
}
