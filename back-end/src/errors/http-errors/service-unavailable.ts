import { ERROR_VI } from "../../types/enum";
import { BaseHttpError } from "./base-http-error";


export class ServiceUnavailableError extends BaseHttpError {
    statusCode = 503;
  
    constructor() {
        super(ERROR_VI.SERVICE_UNAVAILABLE);

        Object.setPrototypeOf(this, ServiceUnavailableError.prototype);
    }
  
    respond() {
        return {
            message: this.message,
        };
    }
}
