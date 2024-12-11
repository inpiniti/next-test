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
                from: 0.1,
                to: null,
                includeFrom: true,
                includeTo: null,
              },
            },
          ],
        },
        {
          id: "순이익_연속_증가",
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
                from: 3,
                to: null,
                includeFrom: true,
                includeTo: null,
              },
            },
          ],
        },
      ],
      sort: {
        column: "C_ROE_TTM",
        label: "ROE",
        order: "DESC",
      },
    }); // 'users' 테이블에서 모든 데이터를 선택
    res.status(200).json(result);
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
