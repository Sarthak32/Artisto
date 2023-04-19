import express from 'express';
import Replicate from 'replicate';
import * as dotenv from 'dotenv';

dotenv.config();
const router = express.Router();
const REPLICATE_API_TOKEN="e3e3767cc5c95ac164fb7d4b8a545c1c05f85816";

const replicate = new Replicate({
  auth: REPLICATE_API_TOKEN,
});

router.post("/", async (req, res) => {
    try {
      const { prompt } = req.body;
      const image = await replicate.run(
        "stability-ai/stable-diffusion:db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf",
        { input: { prompt } }
      );
      res.json({ image });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred while generating image." });
    }
  });
  router.get("/", async (req, res) => {
    res.status(405).send("This endpoint only supports POST requests.");
  });
export default router;
