import { NextApiRequest, NextApiResponse } from "next";

// US19990122001 이코드와
// 엔비디아와 매칭이 안되서 
// wts-info-api 이건 쓸수가 없을듯
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method == 'GET') {
        const response = await fetch('https://wts-info-api.tossinvest.com/api/v2/stock-prices/US19990122001/period-candles/day:1?count=300');
        if (!response.ok) {
            res.status(response.status).json({ error: 'Failed to fetch data' });
            return;
        }
        const data = await response.json();
        const result = data; // Process data if needed

        res.status(200).json(result);
    } else {
        res.status(405).json({error: 'Method Not Allowed'});
    }
}