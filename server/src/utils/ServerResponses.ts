import { Response } from "express";

const Success = (
    res: Response,
    statusCode: number,
    data: any,
    message: string | undefined
) => {
    return res.status(statusCode).send({ data, message });
};
const Fail = (
    res: Response,
    statusCode: number,
    message: string | undefined
) => {
    return res.status(statusCode).send({ message });
};

const Error = (
    res: Response,
    statusCode: number,
    message: string | undefined
) => {
    return res.status(statusCode).send({ message });
};
module.exports = { Success, Fail, Error };
