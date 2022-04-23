import {getAnswers} from "../utils/index";

export default async function handler(req, res) {
    console.log("This hits");
    if (req.method === 'GET') {
        console.log("405 Error")
        return res.status(405);
    }

    try {
        const answers = await getAnswers();
        console.log("test", answers)
        return res.status(200).json(answers);
    } catch (err) {
        console.error(err);
        res.status(500).json({msg: 'Something went wrong.'});
    }
}






//API TEMPLATE

// import {getAnswers} from "../utils";
//
// export default async function handler(req, res) {
//     if (req.method !== 'GET') {
//         return res.status(405).json({msg: "Method not allowed"});
//     }
//
//     try {
//
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({msg: 'Something went wrong.'});
//     }
// }
