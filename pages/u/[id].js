export default function Page() {
  return (
    <div style={{ padding: 40 }}>
      <h2>Welcome 👋</h2>
      <p>Your full AI prompt is unlocked.</p>

      <textarea
        style={{ width: 300, height: 150 }}
        placeholder="Full prompt will show here"
      />
    </div>
  );
}
