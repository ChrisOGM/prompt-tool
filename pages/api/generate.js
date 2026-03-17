export default async function handler(req, res) {
  try {
    const { idea } = req.body;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: `Turn this into a powerful AI prompt:\n${idea}` }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    console.log("FULL RESPONSE:", data);

    if (!data.candidates) {
      return res.status(500).json({
        output: "Error: " + JSON.stringify(data),
      });
    }

    const output =
      data.candidates[0].content.parts[0].text;

    res.status(200).json({ output });

  } catch (err) {
    res.status(500).json({
      output: "Server error: " + err.message,
    });
  }
}
