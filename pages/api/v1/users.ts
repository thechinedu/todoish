// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: string;
  message: string;
};

const validateReq = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  // This acts as a middleware to validate the request
  // if a response is returned, it will be sent to the client
  // if no response is returned, the request will continue to the parent handler
  res.status(200).json({ status: "success", message: "Hijacked the response" });
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    res
      .setHeader("Allow", "POST")
      .status(405)
      .json({ status: "error", message: "Method not allowed" });

    return;
  }

  validateReq(req, res);

  const { body } = req;
  const { email, password } = body;

  console.log(body);
  res.status(200).json({ status: "success", message: "GET user" });
}
