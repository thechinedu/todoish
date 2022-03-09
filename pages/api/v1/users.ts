import type { NextApiRequest, NextApiResponse } from "next";

import validator from "validator";

type Data = {
  status: string;
  message: string;
  data?: unknown;
};

type Middleware = (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
  next?: Middleware
) => void;

// [validateReq, handleReq]

function middlewareChain(...middlewareFns: Middleware[]) {
  return (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const middleware = middlewareFns.slice();
    const next = () => {
      const fn = middleware.shift();
      if (fn) {
        fn(req, res, next);
      }
    };
    next();
  };
}

const validateReq = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { body } = req;
  const { email, password } = body;
  const errors = [];
  console.log("Gets here!", { email, password });

  if (!email || !password) {
    return res.status(400).json({
      status: "error",
      message:
        "Please provide both email and password in the body of the request",
    });
  }

  if (!validator.isEmail(email)) {
    errors.push({
      status: "fail",
      message: "Email is not valid",
    });
  }

  if (!validator.isLength(password, { min: 8 })) {
    errors.push({
      status: "fail",
      message: "Password must be at least 8 characters",
    });
  }

  if (errors.length) {
    return res.status(422).json({
      status: "fail",
      message: "Validation failed",
      data: errors,
    });
  }
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

  // middlewareChain()(req, res);

  // validateReq(req, res);

  // const { body } = req;
  // const { email, password } = body;

  // console.log(body, "Gets here too");
  // res.status(200).json({ status: "success", message: "GET user" });
}
