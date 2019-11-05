const express    = require('express');
const bodyParser = require('body-parser');
const cors       = require('cors');
const helmet     = require('helmet');
const router     = require('./router');
const app        = express();

app.use(cors());
app.use(bodyParser.json());
app.use(helmet());

router.init(app);

module.exports = app;
