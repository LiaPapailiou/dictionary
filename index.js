const express = require('express');
const connectDB = require('./config/db');
const handlebars = require('express-handlebars');

const app = express();

connectDB();
app.use(express.static('public'));
app.engine('.hbs', handlebars({
    layoutsDir: `${__dirname}/views/layouts`,
    extname: 'hbs',
    defaultLayout: 'index',
    partialsDir: `${__dirname}/views/partials`
}));
app.set('view engine', '.hbs');


app.use(express.json({ extended: false }));



app.get('/', (req, res) => {
    res.render('main');
})
app.use('/api/terms', require('./routes/api/dictionary'));



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));