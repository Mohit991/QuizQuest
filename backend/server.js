const express = require('express')
const mysql = require('mysql2');
require('dotenv').config();
// const db = require('./config/dbConnection')4
const db = require('./models/index');

const app = express()


db.sequelize
    .sync({ force: false }) // Set to true only during development to reset tables
    .then(() => console.log('Database synced'))
    .catch((err) => console.error('Error syncing database:', err.message));

app.use('/api/quiz/category', require('./routes/categoryRoutes'))

const PORT = process.env.APP_PORT || 3001;
app.listen(PORT, () => {
    console.log(`App listening at ${PORT}`);
})

