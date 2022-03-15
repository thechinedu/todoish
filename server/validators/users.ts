import { HTTPMethod, HTTPStatus, Middleware } from "@/types/shared";
import { chainMiddlewares } from "@/utils";
import User from "@/server/models/user";
import validator from "validator";

const ensureAllowedRequest: Middleware = (req, res, next) => {
  if (req.method !== HTTPMethod.POST) {
    return res
      .setHeader("Allow", HTTPMethod.POST)
      .status(HTTPStatus.METHOD_NOT_ALLOWED)
      .json({ status: "error", message: "Method not allowed" });
  }

  return next();
};

const ensureRequiredFieldsPresent: Middleware = (req, res, next) => {
  const { body } = req;
  const { email, password } = body;

  if (!email || !password) {
    return res.status(HTTPStatus.BAD_REQUEST).json({
      status: "error",
      message:
        "Please provide both email and password in the body of the request",
    });
  }

  return next();
};

const ensureEmailUniqueness: Middleware = async (req, res, next) => {
  const { body } = req;
  const { email } = body;

  if (await User.findByEmail(email)) {
    return res.status(HTTPStatus.UNPROCESSABLE_ENTITY).json({
      status: "fail",
      message: "Validation failed",
      errors: ["Email is already in use by another user"],
    });
  }

  return next();
};

const ensureValidFields: Middleware = (req, res, next) => {
  const { body } = req;
  const { email, password } = body;
  const errors = [];

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

export const validateCreateUser: Middleware = async (req, res, next) => {
  // const executeMiddlewares = chainMiddlewares(
  //   ensureAllowedRequest,
  //   ensureRequiredFieldsPresent,
  //   ensureEmailUniqueness,
  //   ensureValidFields
  // );

  // return executeMiddlewares(req, res);
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

  if (await User.findByEmail(email)) {
    return res.status(HTTPStatus.UNPROCESSABLE_ENTITY).json({
      status: "fail",
      message: "Validation failed",
      errors: ["Email is already in use by another user"],
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
