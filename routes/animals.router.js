import { Router } from "express";
import Animal from "../models/Animal.js";

const animalsRouter = Router();

// SUB API for animals

animalsRouter.get("/", async (req, res) => {
  const animals = await Animal.find();
  res.json(animals);
});

animalsRouter.get("/:id", async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    res.json(animal);
  } catch (err) {
    res.status(400).json({
      error: `Animal with id ${req.params.id} not found!`,
    });
  }
});

animalsRouter.post("/", async (req, res) => {
  try {
    const animalNew = await Animal(req.body).save();
    res.json(animalNew);
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
});

// update
// PATCH ??? => patch is used to update single fields in model
// PUT ??? => RREPLACES whole model
animalsRouter.patch("/:id", async (req, res) => {
  try {
    const animalUpdated = await Animal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(animalUpdated);
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
});

// delete
animalsRouter.delete("/:id", async (req, res) => {
  try {
    const animalDeleted = await Animal.findByIdAndDelete(req.params.id);
    res.json(animalDeleted);
  } catch (err) {
    res.status(400).json({
      error: `Animal with id ${req.params.id} not found!`,
    });
  }
});

export default animalsRouter;
