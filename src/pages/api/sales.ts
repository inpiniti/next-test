import { NextApiRequest, NextApiResponse } from 'next';
import db from '@/lib/db'; // import the db connection
import { salesTable } from '@/db/sales';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  switch (method) {
    case 'GET':
      const sales = await db.select().from(salesTable);
      res.status(200).json(sales);
      break;
    case 'POST':
      const newSale = await db.insert(salesTable).values(body);
      res.status(201).json(newSale);
      break;
    default:
      res.status(405).json({ error: 'Method Not Allowed' });
      break;
  }
}
