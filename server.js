const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const connectDB = require('./db/connect');
const routes = require('./routes/routes.js');
const {connect} = require('./db/redis.js');
require('dotenv').config();


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(express.json());

const port = process.env.PORT || 5000;

app.use('/', routes);

(async() => {
    try {
        await connect();
        await connectDB(process.env.MONGO_URI);
        app.listen(port, (err) =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch(err) {
        console.log(err);
    }
})();