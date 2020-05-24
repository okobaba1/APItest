import { check, validationResult } from 'express-validator';

const validator = [
  check('name').not().isEmpty().withMessage('Book name field cannot be empty.'),
  check('isbn').not().isEmpty().withMessage('ISBN field cannot be empty.'),
  check('authors').not().isEmpty().withMessage('Author name field cannot be empty'),
  check('publisher').not().isEmpty().withMessage('Publisher field cannot be empty.'),
  check('country').not().isEmpty().withMessage('Country should be inputed'),
  check('number_of_pages').not().isEmpty().withMessage('Number of pages field is empty'),
  check('release_date').not().isEmpty().withMessage('release date field cannot be empty.'),
  check('number_of_pages').isNumeric().withMessage('Page numbers can only be numeric'),
];

const validationHandler = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        error: errors.array().map(error => error.msg)[0],
      });
    }
    return next();
  };
  
  const valid = {
    validationHandler,
    validator,
  };
  
  
  export default valid;