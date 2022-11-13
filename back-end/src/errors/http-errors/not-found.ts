import { RESULT, ERROR_VI } from "../../types/enum";
import { BaseHttpError } from "./base-http-error";


export class NotFoundError extends BaseHttpError {
    statusCode = 404;
  
    constructor() {
        super(ERROR_VI.NOT_FOUND);

        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
  
    respond() {
        return {
            result: RESULT.fail,
            message: this.message,
        };
    }
}
