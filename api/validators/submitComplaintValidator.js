import { body, validationResult } from 'express-validator';

const validateSubmitComplaint = [
  body('userId').trim().isMongoId().escape(),
  body('name').trim().isLength({ min: 1 }).escape(),
  body('email').trim().isEmail().normalizeEmail(),
  body('subject').trim().isLength({ min: 1 }).escape(),
  body('message').trim().isLength({ min: 1 }).escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
export default validateSubmitComplaint