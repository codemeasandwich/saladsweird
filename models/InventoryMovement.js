import mongoose from 'mongoose';

const InventoryMovementSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String,
        required: true,
        enum: ['Delivery', 'Sale', 'Stocktake']
    },
    ingredient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredient',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.models.InventoryMovement || mongoose.model('InventoryMovement', InventoryMovementSchema);
