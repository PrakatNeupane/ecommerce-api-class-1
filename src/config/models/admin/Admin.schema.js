import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    status: {
        type: String,
        default: "inactive",
    },
    fName: {
        type: String,
        required: true,
        trim: true,
        maxlength: [20, "First name must be less than 20 characters"]
    }, lName: {
        type: String,
        required: true,
        trim: true,
        maxlength: [20, "Last name must be less than 20 characters"]

    }
    , dob: {
        type: Date,
        default: null,
    }
    , email: {
        type: String,
        required: true,
        trim: true,
        maxlength: [50, "email must be less than 50 characters"],
        unique: true,
        index: 1, // for fast search in db table
    }, emailValidationCode: {
        type: String,
        default: ""
    }
    , phone: {
        type: String,
        required: true,
        trim: true,
        maxlength: [15, "Phone number must be less than 15 characters"],
        minlength: [10, "Phone number must not be less than 10 characters"],
    }
    , password: {
        type: String,
        required: true,
    }
    , address: {
        type: String,
        default: 'n/a',
    }
}, {
    timestamps: true,
})

export default mongoose.model('Admin', AdminSchema)