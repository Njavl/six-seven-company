import { Joi, Segments } from 'celebrate';

export const createRecipeValidation = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(3).max(64).required().trim(),
    decr: Joi.string().max(200).required().trim(),
    cookiesTime: Joi.number().integer().min(1).max(360).required(),
    cals: Joi.number().integer().min(1).max(10000).allow('', null).optional(),
    category: Joi.string().required(),
    ingredients: Joi.alternatives()
      .try(
        Joi.array().items(
          Joi.object({
            ingredient: Joi.string().required(),
            ingredientAmount: Joi.string().min(2).max(16).required().trim(),
          })
        ),
        Joi.string()
      )
      .required(),
    instruction: Joi.string().max(1200).required().trim(),
  }),
};
