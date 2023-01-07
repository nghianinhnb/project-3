import { ERROR_VI } from "../../types/enum";
import { BaseHttpError } from "./base-http-error";


export class ConflictError extends BaseHttpError {
    statusCode = 409;
  
    constructor() {
        super(ERROR_VI.CONFLICT);

        Object.setPrototypeOf(this, ConflictError.prototype);
    }
  
    respond() {
        return {
            message: this.message,
        };
    }
}