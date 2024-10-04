import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config.js';

export const IsAuthenticatedMiddleware = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  // Check if authorization header is provided
  if (!authHeader) {
    return res.status(401).json({
      status: false,
      error: {
        message: 'Auth headers are not provided in the header',
      },
    });
  }

  // Check if Bearer token is provided correctly
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      status: false,
      error: {
        message: 'Invalid authorization mechanism. Expected Bearer token.',
      },
    });
  }

  // Extract the token from the Bearer header
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      status: false,
      error: {
        message: 'Bearer token missing in the authorization headers.',
      },
    });
  }

  // Verify the token
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        status: false,
        error: 'Invalid access token provided, please login again.',
      });
    }

    req.body.user_id = decoded.user_id; 
    next(); 
  });
};
