import mongoose from "mongoose";

const saleSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        },
        amount: Number,
    },
    {
        timestamps:true
    }
)

const Sale = mongoose.model("Sale",saleSchema)


export default Sale