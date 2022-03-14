import User from "@/server/models/user";
import { HTTPStatus, Middleware } from "@/types/shared";

export const createUser: Middleware = (req, res) => {
  const { email, password } = req.body;
  const user = User.create({ email, password });

  res
    .status(HTTPStatus.CREATED)
    .json({ status: "success", message: "User created", data: user });
};
