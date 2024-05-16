import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

interface IRequestSchemas {
  params?: AnyZodObject;
  body?: AnyZodObject;
  query?: AnyZodObject;
}

export class RequestValidate {
  static execute(schemas: IRequestSchemas) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        if (schemas.params) {
          req.params = await schemas.params.parseAsync(req.params);
        }

        if (schemas.body) {
          req.body = await schemas.body.parseAsync(req.body);
        }

        if (schemas.query) {
          req.query = await schemas.query.parseAsync(req.query);
        }

        next();
      } catch (error) {
        next(error);
      }
    };
  }
}
