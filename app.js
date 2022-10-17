const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const myReqLogger = require('./Utilities/requestLogger');
const routes = require('./Routes/routing');
app.use(cors());
app.use(bodyParser.json());
app.use(myReqLogger);
app.use('/', routes);
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Wallet backend started on port ${port}...`);
});