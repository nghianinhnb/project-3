import { check } from 'express-validator'

import { catchValidateError } from '../../middlewares'


export const pdfValidator = {
    gen: [


        catchValidateError,
    ],

}