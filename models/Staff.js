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
    bic: String
});

module.exports = mongoose.models.Staff || mongoose.model('Staff', StaffSchema);
