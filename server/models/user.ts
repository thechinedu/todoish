import { db } from "@/utils/datasource";

type UserReqParams = {
  email: string;
  password: string;
};

export default class User {
  static create({ email, password }: UserReqParams) {
    return db.user.create({ data: { email, passwordDigest: password } });
  }
}
