import { createAnswer } from '../../lib/redis';

export default async function handler(req, res) {
    const id = await createAnswer(req.body);
    res.status(200).json({ id })
}