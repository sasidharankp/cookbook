import mongoose from 'mongoose';

const recipeSchema = mongoose.Schema({
    title: String,
    notes: String,
    author: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

const recipeModel = mongoose.model('recipe', recipeSchema);

export default recipeModel;