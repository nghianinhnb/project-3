import express from 'express';

import { requireAuth } from '../../middlewares';
import { historyControllers } from './history.controller';
import { historyValidator } from './history.validator';

const router = express.Router();


router.get('/history',
    requireAuth,
    historyValidator.get,
    historyControllers.get,
);

router.get('/report',
    requireAuth,
    historyControllers.report,
);


export { router as historyRouter };
