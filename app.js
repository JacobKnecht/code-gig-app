const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const PORT = process.env || 5000;

app.listen(PORT, console.log(`Server listening on port ${PORT}`));