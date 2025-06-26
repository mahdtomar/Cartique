import { Response } from "express";

export const Success = (
    res: Response,
    statusCode: number,
    data: any,
    message: string | undefined
) => {
    return res.status(statusCode).send({ data, message });
};
export const Fail = (
    res: Response,
    statusCode: number,
    message: string | undefined
) => {
    return res.status(statusCode).send({ message });
};

export const Error = (
    res: Response,
    statusCode: number,
    message: string | undefined
) => {
    return res.status(statusCode).send({ message });
};