const express = require('express');
const connectDB = require('./config/db')
const app = express();


connectDB();

app.use(express.json({ extended: false }));

app.use('/', (req, res) => {
    res.send('Success!');
});


app.use('api/terms', require('./routes/dictionary'));



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));