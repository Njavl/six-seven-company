import { model, Schema } from 'mongoose';

const ingredientSchema = new Schema({
  ingredient: {
    type: String,
    required: true,
    trim: true,
  },
  ingredientAmount: {
    type: String,
    required: true,
    trim: true,
  },
});

const recipeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    decr: {
      type: String,
      required: true,
      trim: true,
    },
    cookiesTime: {
      type: Number,
      required: true,
    },
    cals: {
      type: Number,
      required: false,
    },
    category: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [ingredientSchema],
      required: true,
    },
    instruction: {
      type: String,
      required: true,
      trim: true,
    },
    recipeImg: {
      type: String,
      required: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

recipeSchema.index({ category: 1 });
recipeSchema.index({ owner: 1 });
recipeSchema.index({ name: 'text' });

export const Recipe = model('recipe', recipeSchema);
