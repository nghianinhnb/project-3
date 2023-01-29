import express from 'express';

import { requireAuth } from '../../middlewares';
import { historyControllers } from './history.controller';
import { historyValidator } from './history.validator';

const router = express.Router();


router.post('/pdf/gen',
    requireAuth,
    historyValidator.get,
    historyControllers.get,
);


export { router as historyRouter };
