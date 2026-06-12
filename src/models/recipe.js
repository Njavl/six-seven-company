import { Schema, model } from 'mongoose';

const ingredientSchema = new Schema(
  {
    id: String,
    measure: String,
    name: String,
  },
  { _id: false }
);

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },

    area: {
      type: String,
    },

    instructions: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    thumb: {
      type: String,
    },

    time: {
      type: String,
    },

    ingredients: [ingredientSchema],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Recipe = model('recipes', recipeSchema);
