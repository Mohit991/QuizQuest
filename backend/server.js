const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./models/index');
const { protect } = require('./middleware/authMiddleware'); // Import the protect middleware

const app = express();

// Middleware to parse JSON
app.use(express.json());
// Middleware for CORS
app.use(cors());

// Sync the database
db.sequelize
  .sync({ force: false }) // Set to true only during development to reset tables
  .then(() => console.log('Database synced'))
  .catch((err) => console.error('Error syncing database:', err.message));

// Import routes
const publicRoutes = require('./routes/publicRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const topicRoutes = require('./routes/topicRoutes');
const questionRoutes = require('./routes/questionRoutes');
const userRoutes = require('./routes/userRoutes');
const userProgressRoutes = require('./routes/userProgress');
const levelRoutes = require('./routes/levelRoutes'); // Import levelRoutes
const questionsCountForQuizRoutes = require('./routes/questionsCountForQuizRoutes'); // Import the new route

// Public routes: These routes are accessible without authentication
app.use('/api/public', publicRoutes);

// Apply the protect middleware globally for all routes below this line
app.use(protect);

// Protected routes: All routes below require authentication
app.use('/api/categories', categoryRoutes); // Category-related endpoints
app.use('/api/categories', topicRoutes);        // Topic-related endpoints
app.use('/api/topic', questionRoutes); // Question-related endpoints
app.use('/api/levels', levelRoutes); // Level-related endpoints
app.use('/api/question-counts', questionsCountForQuizRoutes); // Add the new route

app.use('/api/users', userRoutes);    // User-related protected endpoints
app.use('/api/user-progress', userProgressRoutes); // User progress protected endpoints


// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
