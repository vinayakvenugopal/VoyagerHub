import { body, validationResult } from 'express-validator';

const validateRegister = [
    body('name').trim().isLength({ min: 1 }).escape(),
    body('email').trim().isEmail().normalizeEmail(),
    body('password').trim().isLength({ min: 6 }).escape(),
    body('mobile').trim().isMobilePhone().escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

export default validateRegister