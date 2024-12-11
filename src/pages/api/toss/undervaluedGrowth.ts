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
          id: "연평균_매출액_증감률",
          conditions: [
            {
              id: "기간_선택_TTM3_TTM5",
              type: "PERIOD",
              value: "TTM_3",
            },
            {
              id: "NUMBER_RANGE_DEFAULT",
              type: "NUMBER_RANGE",
              value: {
                from: 0.1,
                to: null,
                includeFrom: true,
                includeTo: null,
              },
            },
          ],
        },
        {
          id: "PER",
          conditions: [
            {
              id: "NUMBER_RANGE_DEFAULT",
              type: "NUMBER_RANGE",
              value: {
                from: 0,
                to: 20,
                includeFrom: true,
                includeTo: true,
              },
            },
          ],
        },
        {
          id: "연평균_순이익_증감률",
          conditions: [
            {
              id: "기간_선택_TTM3_TTM5",
              type: "PERIOD",
              value: "TTM_3",
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
      ],
      sort: {
        column: "C_연평균매출액증감률_3Y",
        label: "연평균 매출액 증감률",
        order: "DESC",
      },
    }); // 'users' 테이블에서 모든 데이터를 선택
    res.status(200).json(result);
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
