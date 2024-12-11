import { NextApiRequest, NextApiResponse } from "next";
import { fetchToss } from "./fetchToss";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    const result = await fetchToss({
      filters: [
        {
          id: "주가등락률",
          conditions: [
            {
              id: "기간_선택_DAY_TO_MONTH",
              type: "PERIOD",
              value: "DAY_5",
            },
            {
              id: "NUMBER_RANGE_DEFAULT",
              type: "NUMBER_RANGE",
              value: {
                from: 0,
                to: null,
                includeFrom: true,
                includeTo: null,
              },
            },
          ],
        },
        {
          id: "주가_연속_상승",
          conditions: [
            {
              id: "NUMBER_RANGE_DEFAULT",
              type: "NUMBER_RANGE",
              value: {
                from: 5,
                to: null,
                includeFrom: true,
                includeTo: null,
              },
            },
          ],
        },
      ],
      sort: {
        column: "C_주가등락률_1W",
        label: "주가등락률",
        order: "DESC",
      },
    }); // 'users' 테이블에서 모든 데이터를 선택
    res.status(200).json(result);
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
