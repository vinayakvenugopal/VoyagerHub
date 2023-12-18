// validationMiddleware.js
import { body, validationResult } from 'express-validator';

const validateAddReview = [
  body('name').trim().isLength({ min: 1 }).escape(),
  body('userId').trim().isMongoId().escape(),
  body('hotelId').trim().isMongoId().escape(),
  body('title').trim().isLength({ min: 1 }).escape(),
  body('desc').trim().isLength({ min: 1 }).escape(),
  body('star').isInt({ min: 1, max: 5 }).toInt(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); 
    }
    next();
  },
];

export default validateAddReview
