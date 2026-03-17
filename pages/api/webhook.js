import { nanoid } from "nanoid";
import twilio from "twilio";

const users = {};

export default function handler(req, res) {
  const msg = req.body.Body?.toLowerCase();
  const phone = req.body.From;

  if (!users[phone]) {
    const id = nanoid(6);
    users[phone] = { id };

    const twiml = new twilio.twiml.MessagingResponse();

    twiml.message(`Welcome 👋

Before I unlock your prompt:

1️⃣ Save this number as AI Prompt Tool
2️⃣ Reply DONE`);

    res.setHeader("Content-Type", "text/xml");
    return res.send(twiml.toString());
  }

  if (msg === "done") {
    const id = users[phone].id;
    const link = `https://YOUR-VERCEL-URL.vercel.app/u/${id}`;

    const twiml = new twilio.twiml.MessagingResponse();

    twiml.message(`Perfect ✅

Here’s your access:
${link}

I’ll send you 1 powerful prompt every week 🔥`);

    res.setHeader("Content-Type", "text/xml");
    return res.send(twiml.toString());
  }

  res.status(200).end();
}
