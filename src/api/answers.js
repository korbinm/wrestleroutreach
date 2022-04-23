import {getAnswers} from "../utils/index";
import {} from "@auth0/auth0-react";

export default async function handler(email, req, res) {
    console.log("This hits");
    // console.log("answers.js:", getUserEmail())
    console.log("req.method", req.method)
    if (req.method === 'GET') {
        console.log("405 Error")
        return res.status(405);
    }
    try {
        // console.log("answers.js", user.name)
        console.log("maybe?:",req.body);
        const answers = await getAnswers("korbinmeink@gmail.com");
        console.log("test", answers)
        return (answers);
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
