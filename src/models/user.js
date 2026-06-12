import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      default: null,
    },
    followers: {
      type: [Schema.Types.ObjectId],
      ref: 'users',
      default: [],
    },
    following: {
      type: [Schema.Types.ObjectId],
      ref: 'users',
      default: [],
    },
    favorites: {
      type: [Schema.Types.ObjectId],
      ref: 'recipes',
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const User = model('users', userSchema);
