// validationMiddleware.js
import { body, validationResult } from 'express-validator';

export const validateAddAddress = [
  body('address').trim().isLength({ min: 1 }).escape(),
  body('locality').trim().isLength({ min: 1 }).escape(),
  body('state').trim().isLength({ min: 1 }).escape(),
  body('pincode').trim().escape(),
  body('country').trim().isLength({ min: 1 }).escape(),
  body('userId').trim().isMongoId().escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array() });
    }
    next();
  },
];

export default validateAddAddress
