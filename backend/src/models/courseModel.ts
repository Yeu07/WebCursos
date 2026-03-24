import mongoose from "mongoose";
import { title } from "node:process";

const courseSchema = new mongoose.Schema({
    name: String,
    description: String,
    thumbnail: String,
    price: String,
    sections:[
        {
            name:String,
            recordedAt: String,
            recordingDay: String,
            realDuration:String,
            videos: [{title: String,videoUrl: String,duration: String}]
        }
    ]
}, {
    timestamps: true
})

const Course =  mongoose.model("Course",courseSchema);

export default Course;