import { model, Schema } from 'mongoose';



// З ГІЛКИ MAIN
// ==========================================================


const ingredientSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    measure: {
      type: String,
      required: true,
    },
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
      ref: 'User',
      required: true,
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
      required: true,
    },
    thumb: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
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
  }
);

export const Recipe = model('Recipe', recipeSchema);

// ==========================================================
// МОЯ  СХЕМА + індекси
// ==========================================================
/*
const oldIngredientSchema = new Schema({
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

const oldRecipeSchema = new Schema(
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
      type: [oldIngredientSchema],
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
*/
