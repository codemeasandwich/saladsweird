import mongoose from 'mongoose';

const StaffSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name for the staff memeber'],
        trim: true
    },
    dob: Date,
    role: String,
    iban: String,
    bic: String,
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
        required: true
    }
});

module.exports = mongoose.models.Staff || mongoose.model('Staff', ReportSchema);
