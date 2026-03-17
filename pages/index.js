import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const generate = async () => {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ input })
    });

    const data = await res.json();
    setResult(data.result.slice(0, 150) + "...");
  };

  const goWhatsApp = () => {
    const msg = encodeURIComponent("Hi, I want to unlock my AI prompt");
    window.location.href = `https://wa.me/YOUR_NUMBER?text=${msg}`;
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Turn any idea into a powerful AI prompt</h1>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="What do you want AI to do?"
        style={{ padding: 10, width: 300 }}
      />

      <br /><br />

      <button onClick={generate}>Generate</button>

      <p>{result}</p>

      {result && (
        <button onClick={goWhatsApp}>
          Unlock full prompt on WhatsApp
        </button>
      )}
    </div>
  );
}
