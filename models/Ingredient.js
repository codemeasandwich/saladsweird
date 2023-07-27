import mongoose from 'mongoose';

const IngredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true
    },
    cost: {
        type: Number,
        required: [true, 'Please add a cost per unit']
    },
    unit: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.models.Ingredient || mongoose.model('Ingredient', IngredientSchema);
