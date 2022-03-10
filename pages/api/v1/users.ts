import type { NextApiRequest, NextApiResponse } from "next";

import validator from "validator";

type Data = {
  status: string;
  message: string;
  data?: unknown;
  errors?: unknown;
};

type Middleware = (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
  next: () => void // invoke the next middleware in the queue
) => void;

function chainMiddlewares(...middlewareFns: Middleware[]) {
  return (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const next = () => {
      const middlewareFn = middlewareFns.shift();

      if (middlewareFn) middlewareFn(req, res, next);
    };

    next();
  };
}

const validateReq: Middleware = (req, res, next) => {
  if (req.method !== "POST") {
    return res
      .setHeader("Allow", "POST")
      .status(405)
      .json({ status: "error", message: "Method not allowed" });
  }

  const { body } = req;
  const { email, password } = body;
  const errors = [];

  if (!email || !password) {
    return res.status(400).json({
      status: "error",
      message:
        "Please provide both email and password in the body of the request",
    });
  }

  if (!validator.isEmail(email)) {
    errors.push("Email is not valid");
  }

  if (!validator.isLength(password, { min: 8 })) {
    errors.push("Password must be at least 8 characters");
  }

  if (errors.length) {
    return res.status(422).json({
      status: "fail",
      message: "Validation failed",
      errors,
    });
  }

  return next();
};

const createUser: Middleware = (_, res) => {
  res.status(201).json({ status: "success", message: "User created" });
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const executeMiddlewares = chainMiddlewares(validateReq, createUser);

  executeMiddlewares(req, res);
}
