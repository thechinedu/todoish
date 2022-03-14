import { HTTPMethod, HTTPStatus, Middleware } from "@/types/shared";
import validator from "validator";

export const validateCreateUser: Middleware = (req, res, next) => {
  if (req.method !== HTTPMethod.POST) {
    return res
      .setHeader("Allow", HTTPMethod.POST)
      .status(HTTPStatus.METHOD_NOT_ALLOWED)
      .json({ status: "error", message: "Method not allowed" });
  }

  const { body } = req;
  const { email, password } = body;
  const errors = [];

  if (!email || !password) {
    return res.status(HTTPStatus.BAD_REQUEST).json({
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
    return res.status(HTTPStatus.UNPROCESSABLE_ENTITY).json({
      status: "fail",
      message: "Validation failed",
      errors,
    });
  }

  return next();
};
