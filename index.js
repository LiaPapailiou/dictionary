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
    defaultLayout: 'index',
    partialsDir: `${__dirname}/views/partials`
}));
app.set('view engine', '.hbs');

// Middleware
app.use(express.json({ extended: false }));



app.get('/', (req, res) => {
    res.render('main', { title: 'Digital Dictionary - Home', name: 'This is a digital dictionary' });
})

app.use('/api/terms', routes);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));