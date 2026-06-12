import Joi from 'joi';

export const searchRecipesSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  perPage: Joi.number().integer().min(1).max(20).default(12),
  category: Joi.string().trim().optional(),
  ingredient: Joi.string().trim().optional(),
  search: Joi.string().trim().optional(),
});
