import type { Data, Middleware } from "@/types/shared";
import type { NextApiRequest, NextApiResponse } from "next";

export function chainMiddlewares(...middlewareFns: Middleware[]) {
  return (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const next = () => {
      const middlewareFn = middlewareFns.shift();

      if (middlewareFn) middlewareFn(req, res, next);
    };

    next();
  };
}
