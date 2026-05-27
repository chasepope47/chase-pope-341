const { body, validationResult } = require('express-validator');

const pantryItemValidationRules = () => {
    return [
        body('name').trim().notEmpty().withMessage('Name is required.'),
        body('category').trim().notEmpty().withMessage('Category is required.'),
        body('quantity').isInt({ min: 1 }).withMessage('Quantity must be an integer greater than 0.'),
        body('cost').isFloat({ min: 0 }).withMessage('Cost must be a positive number.'),
        body('expirationDate').isISO8601().toDate().withMessage('Expiration date must be a valid date (YYYY-MM-DD).')
    ];
};

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    
    // Format the errors to return a clean response
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }));

    return res.status(400).json({
        errors: extractedErrors,
    });
};

module.exports = {
    pantryItemValidationRules,
    validate,
};