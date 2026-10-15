const jwt = require('jsonwebtoken');

async function identifyUser(req, res, next) {
    try {
        const token = req.cookies?.token;

        // Check whether the token exists
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required. Please log in.'
            });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach authenticated user information to the request
        req.user = decoded;

        // Continue to the next middleware or controller
        return next();

    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                success: false,
                message: 'Your session has expired. Please log in again.'
            });
        }

        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                success: false,
                message: 'Invalid authentication token. Please log in again.'
            });
        }

        console.error('Authentication middleware error:', error);

        return res.status(500).json({
            success: false,
            message: 'Internal server error during authentication.'
        });
    }
}

module.exports = identifyUser;