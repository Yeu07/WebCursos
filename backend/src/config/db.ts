import mongoose from 'mongoose'


export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL || "", {
            serverSelectionTimeoutMS: 5000, 
            connectTimeoutMS: 10000,
        })
        console.log("Database connected")
    } catch (error) {
        console.error("Error connecting to MongoDB",error)
        process.exit(1)
    }
}