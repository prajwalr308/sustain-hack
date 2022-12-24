import { Document } from "bson";
import { WithId } from "mongodb";
import clientPromise from "../../server/lib/mongodb";

export default async function handler(
  req: { method: any; body: string },
  res: { json: (arg0: { status: number; data: WithId<Document>[] }) => void }
) {
  const client = await clientPromise;
  const db = client.db("test");
  const users = await db.collection("users").find({}).toArray();
  res.json({ status: 200, data: users });
}
