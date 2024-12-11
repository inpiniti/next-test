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
          id: "배당_수익률",
          conditions: [
            {
              id: "NUMBER_RANGE_DEFAULT",
              type: "NUMBER_RANGE",
              value: {
                from: 0.03,
                to: null,
                includeFrom: true,
                includeTo: null,
              },
            },
          ],
        },
        {
          id: "배당_성향",
          conditions: [
            {
              id: "NUMBER_RANGE_DEFAULT",
              type: "NUMBER_RANGE",
              value: {
                from: 0.3,
                to: null,
                includeFrom: true,
                includeTo: null,
              },
            },
          ],
        },
        {
          id: "배당_연속_지급_년수",
          conditions: [
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
        column: "C_배당수익률",
        label: "배당수익률",
        order: "DESC",
      },
    }); // 'users' 테이블에서 모든 데이터를 선택
    res.status(200).json(result);
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
