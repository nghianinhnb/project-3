import { query } from 'express-validator'

import { catchValidateError } from '../../middlewares'


export const historyValidator = {
    get: [
        query('page')
            .optional()
            .isInt({min: 0}),
        query('limit')
            .optional()
            .isInt({min: 0, max: 100}),

        catchValidateError,
    ],

}