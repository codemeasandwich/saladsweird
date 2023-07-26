import mongoose from 'mongoose';

const MenuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name cannot be more than 50 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please add a price']
    },
    ingredients: [{
        name: {
            type: String,
            required: [true, 'Please add an ingredient name']
        },
        quantity: {
            type: Number,
            required: [true, 'Please add a quantity for this ingredient']
        }
    }],
    location: {
        type: String,
        required: [true, 'Please add a location']
    }
});

module.exports = mongoose.models.MenuItem || mongoose.model('MenuItem', MenuItemSchema);
