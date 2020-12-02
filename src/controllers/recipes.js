import express from 'express';
import mongoose from 'mongoose';

import recipeModel from '../models/recipe.js';

const router = express.Router();

export const getAllRecipes = async (req, res) => { 
    try {
        const recipes = await recipeModel.find();
        res.status(200).json(recipes);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getRecipe = async (req, res) => { 
    const { id } = req.params;

    try {
        const recipe = await recipeModel.findById(id);
        res.status(200).json(recipe);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createRecipe = async (req, res) => {
    console.log(req.body)
    const { title, notes, selectedFile, author, tags } = req.body;
    const newRecipe = new recipeModel({ title, notes, selectedFile, author, tags })

    try {
        await newRecipe.save();
        res.status(201).json(newRecipe );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateRecipe = async (req, res) => {
    const { id } = req.params;
    const { title, notes, author, selectedFile, tags } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Recipe with id: ${id}`);
    const updatedRecipe = { author, title, notes, tags, selectedFile, _id: id };
    await recipeModel.findByIdAndUpdate(id, updatedRecipe, { new: true });
    res.json(updatedRecipe);
}

export const deleteRecipe = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Recipe with id: ${id}`);
    await recipeModel.findByIdAndRemove(id);
    res.json({ message: "Recipe deleted successfully." });
}

export const likeRecipe = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Recipe with id: ${id}`);
    const recipe = await recipeModel.findById(id);
    const updatedRecipe = await recipeModel.findByIdAndUpdate(id, { likeCount: recipe.likeCount + 1 }, { new: true });
    res.json(updatedRecipe);
}

export default router;
