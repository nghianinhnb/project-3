import { body } from 'express-validator'

import { catchValidateError } from '../../middlewares'


export const pdfValidator = {
    gen: [
        body('batchName')
            .exists(),
        body('certificatedName')
            .exists(),

        catchValidateError,
    ],

}