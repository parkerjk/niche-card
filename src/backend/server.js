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
        /*
        const response = await client.responses.create({
            model: "gpt-5-nano",
            instructions:
                "You are a credit card analysis AI tool that compares credit cards based on rewards and fees. Give a holistic breakdown of the provided cards. Use bullet points and emojis.",

            input: req.body.input
            */

        const response = await client.responses.create({
            model: "gpt-5-nano",
            input: "Write a one-sentence bedtime story about a unicorn."
        });
    //});

        res.json({ text: response.output[0].content[0].text });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "OpenAI error" });
    }
});

app.listen(3001, () => console.log("Backend running on http://localhost:3001"));