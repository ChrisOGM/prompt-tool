import { useState } from "react";

export default function Home() {
  const [idea, setIdea] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generatePrompt = async () => {
    if (!idea) return;

    setLoading(true);
    setResult("");

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idea }),
    });

    const data = await res.json();
    setResult(data.output);
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>
          Turn any idea into a powerful AI prompt
        </h1>

        <input
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="e.g. design a luxury logo"
          style={styles.input}
        />

        <button onClick={generatePrompt} style={styles.button}>
          {loading ? "Generating..." : "Generate"}
        </button>

        {result && (
          <div style={styles.resultBox}>
            <h3>🔥 Your AI Prompt:</h3>
            <p>{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a, #1e1b4b)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "sans-serif",
  },
  card: {
    background: "#111827",
    padding: "30px",
    borderRadius: "16px",
    width: "90%",
    maxWidth: "400px",
    boxShadow: "0 0 40px rgba(0,0,0,0.5)",
  },
  title: {
    color: "#fff",
    marginBottom: "20px",
    fontSize: "22px",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    marginBottom: "15px",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
  resultBox: {
    marginTop: "20px",
    background: "#1f2937",
    padding: "15px",
    borderRadius: "10px",
    color: "#e5e7eb",
  },
};
