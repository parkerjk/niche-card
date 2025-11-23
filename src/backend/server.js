import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.post("/api/compare", async (req, res) => {
    try {
        
        console.log("Received request body:", req.body);
        const cards = JSON.stringify(req.body, null, 2);
        //const cards_text = JSON.stringify(cards, null, 2);
        const response = await client.responses.create({
            model: "gpt-5-nano",
            input: `You are a credit card analysis AI tool that compares credit cards based on rewards and fees. Give a holistic breakdown of the provided cards.
            Use bullet points and emojis, make sure to emphasize reward categories and make sure you go over areas of rewards those cards dont cover, make this a big point. 
            Ensure output length is between 100 - 250, use paragraphs and emojis. Do what you can with the information. 
            Give final tips on what other cards to get. Give a one off response and do NOT ask for more information. 
            Give examples of use cases for each card. Format the response in HTML format for web display, use section headers, normal header, lists, and div elements, be consistent for all sections.
            NO EM DASHES. Get straight to the point, don't say anything like here's a breakdown.
            This text is to be displayed on a credit card website format for web viewing. Here is a sample for a single card: 
            <section aria-label="Freedom Unlimited breakdown">
            <h3>Freedom Unlimited 💎</h3>
            <ul>
                <li>💳 Annual fee: $0</li>
                <li>💰 Rewards: 1.5% cash back on all purchases (universal)</li>
                <li>🎁 Welcome offer: Spend $500 in 90 days to earn 20,000 Chase points (historical up to 25,000)</li>
                <li>🔗 Network: Visa; issuer: Chase</li>
                <li>🧭 Best use: Simple, higher flat-rate cash back for everyday buys</li>
                <li>📝 Use case: dining, groceries, travel bookings, utilities and more to maximize cash back</li>
            </ul>
            </section>
            Here are the cards you are comparing: ${cards}`
        });
        
        res.json({ text: response.output_text || "No content available" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "OpenAI error" });
    }
});

app.listen(3001, () => console.log("Backend running on http://localhost:3001"));