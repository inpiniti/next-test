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
          id: "PBR",
          conditions: [
            {
              id: "NUMBER_RANGE_DEFAULT",
              type: "NUMBER_RANGE",
              value: {
                from: 0,
                to: 1,
                includeFrom: true,
                includeTo: true,
              },
            },
          ],
        },
        {
          id: "신고가",
          conditions: [
            {
              id: "NUMBER_RANGE_DEFAULT",
              type: "NUMBER_RANGE",
              value: {
                from: null,
                to: 20,
                includeFrom: null,
                includeTo: true,
              },
            },
          ],
        },
      ],
      sort: {
        column: "C_PER",
        label: "PER",
        order: "ASC",
      },
    }); // 'users' 테이블에서 모든 데이터를 선택
    res.status(200).json(result);
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
