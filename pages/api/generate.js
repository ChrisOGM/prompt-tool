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
                  text: `Turn this idea into a powerful, detailed AI prompt:\n\n${idea}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    console.log("DATA:", JSON.stringify(data, null, 2));

    // 🔥 SAFE extraction (handles all cases)
    let output = "No response";

    if (
      data &&
      data.candidates &&
      data.candidates.length > 0 &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts.length > 0
    ) {
      output = data.candidates[0].content.parts
        .map((p) => p.text)
        .join("");
    }

    res.status(200).json({ output });
