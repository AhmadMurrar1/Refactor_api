import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [2, 'too short'],
        maxlength: 50,
        unique: true,
    },
    cash: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function(value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value);
            },
            message: "invalid email address"
        }
    }
}, {
    timestamps: true
});

// Create and export the User model based on the userSchema
const User = mongoose.model('User', userSchema);
export default User;
