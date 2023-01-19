// Start server
require('dotenv').config();
import mongoose from 'mongoose';

import { logger } from './helpers/logger';
import app from './app';


async function start() {
    const PORT = process.env.PORT || 8000;

    try {
        await mongoose.connect(process.env.MONGO_URL!);
        logger.info("Connected to MongoDb");
    } catch (err) {
        console.error(err);
    }

    app.listen(PORT, () => {
        logger.info(`Listening on Port ${PORT} ...`);
    });
}


start();
