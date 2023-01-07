// Start server
require('dotenv').config();
import mongoose from 'mongoose';

import app from './app';


async function start() {
    const PORT = process.env.PORT || 8000;

    try {
        await mongoose.connect(process.env.MONGO_URL!);
        console.log("Connected to MongoDb");
    } catch (err) {
        console.error(err);
    }

    app.listen(PORT, () => {
        console.log(`Listening on Port ${PORT} ...`);
    });
}


start();
