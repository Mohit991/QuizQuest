const express = require('express');
require('dotenv').config();
const db = require('./models/index');

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Sync the database
db.sequelize
    .sync({ force: false }) // Set to true only during development to reset tables
    .then(() => console.log('Database synced'))
    .catch((err) => console.error('Error syncing database:', err.message));

// Import and use routes
const categoryRoutes = require('./routes/categoryRoutes');
const topicRoutes = require('./routes/topicRoutes');

// Set up API routes
app.use('/api/categories', categoryRoutes); // For category-related endpoints
app.use('/api/categories', topicRoutes); // For topic-related endpoints

// Start the server
const PORT = process.env.APP_PORT || 3001;
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});
