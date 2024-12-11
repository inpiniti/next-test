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
          id: "PBR",
          conditions: [
            {
              id: "NUMBER_RANGE_DEFAULT",
              type: "NUMBER_RANGE",
              value: {
                from: 0,
                to: 1.5,
                includeFrom: true,
                includeTo: true,
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
                to: 15,
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
                from: 0,
                to: null,
                includeFrom: true,
                includeTo: null,
              },
            },
          ],
        },
      ],
      sort: {
        column: "C_PBR",
        label: "PBR",
        order: "ASC",
      },
    }); // 'users' 테이블에서 모든 데이터를 선택
    res.status(200).json(result);
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
