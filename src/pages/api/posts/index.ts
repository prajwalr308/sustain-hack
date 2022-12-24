import Post from "../../../models/post";
import dbConnect from "../../../server/lib/dbConnect";
import clientPromise from "../../../server/lib/mongodb";

export default async function handler(req: any, res: any) {
  const client = await clientPromise;
  
  await dbConnect()
  switch (req.method) {
    case "POST":
      try {
        console.log('ran get')
        const bodyObject = JSON.parse(req.body);
        const myPost = await Post.create(bodyObject);
        res.json(myPost);
      } catch (error) {
        console.log(error);
      }
      // const bodyObject = JSON.parse(req.body);
      // const myPost = await db.collection("posts").insertOne(bodyObject);
      // res.json(myPost);
      // break;
    case "GET":
      try {
        console.log('ran get')
        let allPosts = []
         allPosts = await Post.find({});
       if(allPosts ===undefined || allPosts.length ===0){
        res.json([]);
      }
        res.json(allPosts);
      } catch (error) {
        console.log("get error",error);
        res.json([]);
      }

      break;
  }
}
