import mongoose from 'mongoose';

const ReportSchema = new mongoose.Schema({
    location: {
        type: String,
        required: [true, 'Please add a location'],
        trim: true,
        maxlength: [50, 'Location cannot be more than 50 characters']
    },
    month: {
        type: Date,
        required: [true, 'Please add a month']
    },
    totalCostOfDeliveries: {
        type: Number,
        default: 0
    },
    totalSalesRevenue: {
        type: Number,
        default: 0
    },
    totalValueOfInventory: {
        type: Number,
        default: 0
    },
    totalWasteCost: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.models.Report || mongoose.model('Report', ReportSchema);
