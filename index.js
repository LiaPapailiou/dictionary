const express = require('express');
const connectDB = require('./config/db');
const handlebars = require('express-handlebars');
const routes = require('./routes/api/dictionary');

const app = express();

connectDB();

app.use(express.static('public'));

// Configure express-handlebars
app.engine('.hbs', handlebars({
    layoutsDir: `${__dirname}/views/layouts`,
    extname: 'hbs',
    defaultLayout: 'main',
    partialsDir: `${__dirname}/views/partials`,
}));
app.set('view engine', '.hbs');

// Middleware
app.use(express.json({ extended: false }));


app.use('/api/terms', routes);



const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));