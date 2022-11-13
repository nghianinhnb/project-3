import { RESULT } from "../../types/enum";

export abstract class BaseHttpError extends Error {
    abstract statusCode: number;

    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, BaseHttpError.prototype);
    }

    abstract respond(): {
        result: RESULT,
        message: string,
    }
}
