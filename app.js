const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./config/database');

sequelize.authenticate()
  .then(() => console.log('Database connection successful'))
  .catch(err => console.log(`Error: ${err}`));

const app = express();

app.engine('handlebars', exphbs({ defaultLayout : 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.send('INDEX'));

app.use('/gigs', require('./routes/gigs'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server listening on port ${PORT}`));