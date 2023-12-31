import mongoose from 'mongoose';

const RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add the name of the dish'],
        trim: true
    },
    items: [{
        quantity: {
            type: Number,
            required: true
        },
        ingredient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ingredient',
            required: true
        }
    }]
});

module.exports = mongoose.models.Recipe || mongoose.model('Recipe', RecipeSchema);
