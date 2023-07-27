import mongoose from 'mongoose';

const IngredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true
    },
    address: {
        type: String,
        required: [true, 'Please add a address'],
        unique: true,
        trim: true
    },
    menu: [{
        recipe: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipe',
            required: true
        },
        price: {
            type: Number,
            required: [true, 'Each menu item needs a price'],
            unique: true
        },
        extras: {
            type: Boolean,
            default: false,
        }
    }]
});

module.exports = mongoose.models.Ingredient || mongoose.model('Ingredient', IngredientSchema);
