import { searchAnswer } from "../../lib/redis";

export default async function handler(req, res) {
    const q = req.query.q;
    const answers = await searchAnswer(q);
    res.status(200).json({ answers });
  }