import { Request, Response, NextFunction, RequestHandler } from "express";

type AsyncFunction = (
    req: Request,
    res: Response,
    next?: NextFunction
) => Promise<any>;

const asyncWrapper = (asyncfn: AsyncFunction): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
        asyncfn(req, res, next).catch((error) => {
            next(error);
        });
    };
};

export default asyncWrapper;
