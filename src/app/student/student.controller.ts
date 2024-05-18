import { Request, Response } from "express";
import { StudentServices } from "./student.service";

const createStudent = async (req : Request, res : Response) => {
    try{
        const {student : studentData} = req.body

        //now will call the service function
        const result = await StudentServices.createStudentIntoDB(studentData)
    
    
        //send response
    
        res.status(200).json({
            success : true,
            message: 'Student created successfully',
            data: result,
        })
    }
    catch(err){
        console.log(err);
    }
};

export const StudentControllers = {
    createStudent
}