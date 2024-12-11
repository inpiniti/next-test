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
          id: "매출_총_이익률",
          conditions: [
            {
              id: "기간_선택_QUARTER_TTM",
              type: "PERIOD",
              value: "TTM",
            },
            {
              id: "NUMBER_RANGE_DEFAULT",
              type: "NUMBER_RANGE",
              value: {
                from: 0.2,
                to: null,
                includeFrom: true,
                includeTo: null,
              },
            },
          ],
        },
        {
          id: "ROE",
          conditions: [
            {
              id: "기간_선택_QUARTER_TTM",
              type: "PERIOD",
              value: "TTM",
            },
            {
              id: "NUMBER_RANGE_DEFAULT",
              type: "NUMBER_RANGE",
              value: {
                from: 0.15,
                to: null,
                includeFrom: true,
                includeTo: null,
              },
            },
          ],
        },
      ],
      sort: {
        column: "C_매출총이익률_TTM",
        label: "매출총이익률",
        order: "DESC",
      },
    }); // 'users' 테이블에서 모든 데이터를 선택
    res.status(200).json(result);
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
