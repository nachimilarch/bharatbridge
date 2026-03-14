const validate = (schema, property = 'body') => (req, res, next) => {
  const { error, value } = schema.validate(req[property], {
    abortEarly: false,
    stripUnknown: true,
  });
  if (error) {
    return res.status(422).json({
      success: false,
      message: 'Validation failed.',
      errors: error.details.map((d) => ({
        field: d.path.join('.'),
        message: d.message.replace(/['"]/g, ''),
      })),
    });
  }
  req[property] = value;
  next();
};

module.exports = { validate };
