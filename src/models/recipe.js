import { model, Schema } from 'mongoose';

const ingredientSchema = new Schema(
  {
    id: {
      type: Schema.Types.ObjectId,
      ref: 'Ingredient',
      required: true,
    },
    measure: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false },
);

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    area: {
      type: String,
      trim: true,
    },
    instructions: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    thumb: {
      type: String,
      required: true,
      trim: true,
    },
    time: {
      type: String,
      required: true,
      trim: true,
    },
    calories: {
      type: Number,
      default: null,
    },
    ingredients: {
      type: [ingredientSchema],
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Recipe = model('Recipe', recipeSchema);
