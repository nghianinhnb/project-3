import { RESULT, ERROR_VI } from "../../types/enum";
import { BaseHttpError } from "./base-http-error";


export class InternalServerError extends BaseHttpError {
    statusCode = 500;
  
    constructor() {
        super(ERROR_VI.INTERNAL_ERROR);

        Object.setPrototypeOf(this, InternalServerError.prototype);
    }
  
    respond() {
        return {
            result: RESULT.fail,
            message: this.message,
        };
    }
}
