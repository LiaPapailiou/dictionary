const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const connectDB = require('./config/db');
const routes = require('./routes/api/dictionary');

const app = express();

connectDB();
app.use(express.static('public'));

app.engine('.hbs', handlebars({
  layoutsDir: `${__dirname}/views/layouts`,
  extname: 'hbs',
  defaultLayout: 'main',
  partialsDir: `${__dirname}/views/partials`,
}));
app.set('view engine', '.hbs');
app.set('views', path.resolve(__dirname, 'views'));

app.use(express.json({ extended: false }));

app.use('/api/terms', routes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('public'));
  app.get('/', (req, res) => {
    res.redirect('/api/terms');
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
