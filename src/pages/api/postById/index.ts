import { ObjectId } from "mongodb";
import clientPromise from "../../../server/lib/mongodb";
import Post from "../../../models/post";
import dbConnect from "../../../server/lib/dbConnect";

export default async function handler(req: any, res: any) {
  const { method } = req

  await dbConnect()
  console.log("id---------->",req.query)
  switch (method) {
    case 'GET':
      try {
        const post = await Post.findById(req.query.id)
       
        res.status(200).json({ success: true, data: post })
      } catch (error) {
       
        res.status(400).json({ success: false })
      }
      break
    
    default:
      res.status(400).json({ success: false })
      break
  }
}