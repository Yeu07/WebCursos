import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    googleId: String,  
    firstName: String,
    lastName: String,
    pictureUrl: String,
    email: String,
}, {
    timestamps: true
})

const User =  mongoose.model("User",userSchema);

export default User;