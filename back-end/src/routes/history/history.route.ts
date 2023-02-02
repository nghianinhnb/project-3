import express from 'express';

import { historyControllers } from './history.controller';
import { historyValidator } from './history.validator';

const router = express.Router();


router.get('/history',
    historyValidator.get,
    historyControllers.get,
);

router.get('/report',
    historyControllers.report,
);


export { router as historyRouter };
