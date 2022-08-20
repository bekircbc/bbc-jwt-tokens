import mongoose from "mongoose";
const { Schema, model } = mongoose;

const AnimalSchema = new Schema(
  {
    name: { type: String, required: true },
    age: Number, // optional field
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Animal = model("Animal", AnimalSchema);
// Model Name => lowecase => animal => pluralize => animals

export default Animal;
