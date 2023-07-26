import mongoose from 'mongoose';

const IngredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name cannot be more than 50 characters']
    },
    costPerUnit: {
        type: Number,
        required: [true, 'Please add a cost per unit']
    },
    quantity: {
        type: Number,
        default: 0
    },
    location: {
        type: String,
        required: [true, 'Please add a location']
    }
});

module.exports = mongoose.models.Ingredient || mongoose.model('Ingredient', IngredientSchema);
