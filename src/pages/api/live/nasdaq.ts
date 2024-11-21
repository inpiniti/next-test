import { NextApiRequest, NextApiResponse } from "next";
import db from "@/lib/db"; // import the db connection
import { nasdaqLiveTable } from '@/db/schema';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method == 'GET') {
        const result = await db.select().from(nasdaqLiveTable); // 'users' 테이블에서 모든 데이터를 선택
        res.status(200).json(result);
    } else {
        res.status(405).json({error: 'Method Not Allowed'});
    }
}