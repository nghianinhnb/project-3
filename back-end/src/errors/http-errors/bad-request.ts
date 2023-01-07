import { ERROR_VI } from "../../types/enum";
import { BaseHttpError } from "./base-http-error";


export class BadRequestError extends BaseHttpError {
    statusCode = 400;
  
    constructor(message?: string[]) {
        super(ERROR_VI.MISSING_PARAMETERS);

        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
  
    respond() {
        return {
            message: this.message,
        };
    }
}