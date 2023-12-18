import { body } from 'express-validator';

const loginValidator = [
  body('email').isEmail().normalizeEmail().escape(),
  body('password').isLength({ min: 6 }).trim().escape(),
];

export default loginValidator
