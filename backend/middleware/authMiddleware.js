const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User'); // Assuming you need user details for role-based protection

const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Check if the token exists in the Authorization header
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Extract token from the Authorization header
            token = req.headers.authorization.split(' ')[1];

            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach user information to the request object
            req.user = await User.findByPk(decoded.id, {
                attributes: ['id', 'name', 'email'],
            });

            if (!req.user) {
                return res.status(401).json({ message: 'Unauthorized user' });
            }

            next(); // Proceed to the next middleware or route handler
        } catch (error) {
            console.error('Token verification error:', error);
            res.status(401).json({ message: 'Invalid token' });
        }
    } else {
        res.status(401).json({ message: 'No token provided' });
    }
});

module.exports = { protect };
