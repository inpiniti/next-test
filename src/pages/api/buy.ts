import { NextApiRequest, NextApiResponse } from 'next';
import db from '@/lib/db'; // import the db connection
import { buyTable } from '@/db/buy';
import { eq } from 'drizzle-orm';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query, body } = req;

  try {
    switch (method) {
      case 'GET':
        const { id } = query; // 쿼리 파라미터에서 id 값을 읽어옴
        if (!id || Array.isArray(id)) {
          return res
            .status(400)
            .json({ error: 'id is required and must be a string' });
        }
        const buys = await db
          .select()
          .from(buyTable)
          .where(eq(buyTable.id, String(id)));

        res.status(200).json(buys);
        break;
      case 'POST':
        console.log(1);
        const newBuy = await db.insert(buyTable).values(body);
        console.log(2);
        res.status(201).json(newBuy);
        console.log(3);
        break;
      case 'PUT':
        const { key, ...updateData } = body;
        const updatedBuy = await db
          .update(buyTable)
          .set(updateData)
          .where(eq(buyTable.key, key));
        res.status(200).json(updatedBuy);
        break;
      case 'DELETE':
        const { key: deleteKey } = body;
        await db.delete(buyTable).where(eq(buyTable.key, deleteKey));
        res.status(204).end();
        break;
      default:
        res.status(405).json({ error: 'Method Not Allowed' });
        break;
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
