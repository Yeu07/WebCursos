import type { Request, Response } from "express";
import Course from "../models/courseModel.js";

class CourseController{
    constructor(){}

    async getCourses(req:Request,res:Response){
        try {
            const courses = await Course.find()
            res.status(200).json({data:courses, message:"Correct"})
        } catch (error) {
            res.status(500).json({msg: "Internal Server Error"})
        }
    }

    async createCoursee(req:Request,res:Response){
        const {name,thumbnail,videos} = req.body;

        const newCourse = new Course({
            name:name,
            thumbnail:thumbnail,
            videos:videos
        })
        try {
            const savedCourse = await newCourse.save()
            res.status(201).json({savedCourse})
        } catch (error) {
            res.status(500).json({msg: "Internal Server Error"})
        }
    }


}

export default new CourseController()