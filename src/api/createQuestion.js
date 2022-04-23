import {createQuestion} from "../utils";

export default async function handler(req, res) {
    const {email, url, question} = req.body;
    if (req.method !== 'GET') {
        return res.status(405).json({msg: "Method not allowed"});
    }

    try {
       const createdQuestion = await createQuestion(email, url, question);
        return res.status(200).json(createdQuestion);
    } catch (err) {
        console.error(err);
        res.status(500).json({msg: 'Something went wrong.'});
    }
}
