// validationMiddleware.js
import { body, validationResult } from 'express-validator';

const validateCreateHotel = [
  body('name').trim().isLength({ min: 1 }).escape(),
  body('city').trim().isLength({ min: 1 }).escape(),
  body('address').trim().isLength({ min: 1 }).escape(),
  body('desc').trim().escape(),
  body('hotelierId').trim().isMongoId().escape(),
  body('starRating').isInt({ min: 1, max: 5 }).toInt(),
  body('videoUrl').optional().trim().isURL().escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export default validateCreateHotel
