const express = require('express');
const generateMasterPassword = require('./controllers/fn.js');
const app = express();
const connectDB = require('./db/connect');
const routes = require('./routes/routes.js');
require('dotenv').config();

app.use(express.json());

const port = process.env.PORT || 5000;
app.use('/', routes);
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();