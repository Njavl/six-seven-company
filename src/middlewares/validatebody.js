import createHttpError from 'http-errors';

export const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body ?? {}, {
      abortEarly: false,
    });

    if (error) {
      next(createHttpError(400, error.message));
      return;
    }

    next();
  };
};

export const validateQuery = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.query, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      next(createHttpError(400, error.message));
      return;
    }

    req.validatedQuery = value;
    next();
  };
};
