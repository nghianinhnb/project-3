import { RESULT, ERROR_VI } from "../../types/enum";
import { BaseHttpError } from "./base-http-error";


export class UnauthorizedError extends BaseHttpError {
    statusCode = 401;
  
    constructor() {
        super(ERROR_VI.UNAUTHORIZED);

        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
  
    respond() {
        return {
            result: RESULT.fail,
            message: this.message,
        };
    }
}
