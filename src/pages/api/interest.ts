import { NextApiRequest, NextApiResponse } from "next";
import db from "@/lib/db"; // import the db connection
import { interestTable } from "@/db/interest";
import { eq } from "drizzle-orm";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  switch (method) {
    case "GET":
      const interests = await db().select().from(interestTable);
      res.status(200).json(interests);
      break;
    case "POST":
      const newInterest = await db().insert(interestTable).values(body);
      res.status(201).json(newInterest);
      break;
    case "DELETE":
      const { key: deleteKey } = body;
      await db().delete(interestTable).where(eq(interestTable.key, deleteKey));
      res.status(204).end();
      break;
    default:
      res.status(405).json({ error: "Method Not Allowed" });
      break;
  }
}
