import { Joi, Segments } from 'celebrate';

export const searchRecipesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(1).max(20).default(12),
    category: Joi.string().trim().optional(),
    ingredient: Joi.string().trim().optional(),
    search: Joi.string().trim().optional(),
  }),
};

export const createRecipeSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().trim().min(2).max(64).required(),
    description: Joi.string().trim().max(200).required(),
    category: Joi.string().trim().required(),
    area: Joi.string().trim().optional(),
    time: Joi.string().trim().required(),
    calories: Joi.number()
      .integer()
      .min(1)
      .max(10000)
      .allow('', null)
      .optional(),
    instructions: Joi.string().trim().max(1200).required(),
    ingredients: Joi.alternatives()
      .try(
        Joi.array()
          .min(1)
          .items(
            Joi.object({
              id: Joi.string().trim().required(),
              measure: Joi.string().trim().min(1).max(32).required(),
            })
          ),
        Joi.string()
      )
      .required(),
  }),
};
