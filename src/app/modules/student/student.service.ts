import mongoose, { startSession } from "mongoose";
import { IStudent } from "./student.interface";
import { Student } from "./student.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { User } from "../users/users.model";


// Here it will be getAllStudents, getStudentById and other find or some operations (Later)
  // Fetching all the data from database



  const getAllStudents = async () => {
    // Fetching all the data from database
    const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate : {
        path: 'academicFaculty'
      }
    });
    return result;
  };


  const getSingleStudent = async (id: string) => {
    const result = await Student.findOne({id}).populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate : {
        path: 'academicFaculty'
      }
    });
    return result;
  };

  const updateStudent = async (id: string, payload: Partial<IStudent>) => {
    const { name, guardian, ...remainingStudentData } = payload;
  
    const modifiedUpdatedData: Record<string, unknown> = {
      ...remainingStudentData,
    };
  
    /*
      guardain: {
        fatherOccupation:"Teacher"
      }
  
      guardian.fatherOccupation = Teacher
  
      name.firstName = 'Mezba'
      name.lastName = 'Abedin'
    */
  
    if (name && Object.keys(name).length) {
      for (const [key, value] of Object.entries(name)) {
        modifiedUpdatedData[`name.${key}`] = value;
      }
    }
  
    if (guardian && Object.keys(guardian).length) {
      for (const [key, value] of Object.entries(guardian)) {
        modifiedUpdatedData[`guardian.${key}`] = value;
      }
    }
  
    console.log(modifiedUpdatedData);
  
    const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
      new: true,
      runValidators: true,
    });
    return result;
  };


  const deleteStudent = async (id: string) => {

    const session = await mongoose.startSession();

    try{
      session.startTransaction();
      const deletedStudent = await Student.findOneAndUpdate({id}, {isDeleted: true}, {new: true, session});

      if(!deletedStudent){
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete student")
      }


      const deletedUser = await User.findOneAndUpdate({id}, {isDeleted: true}, {new: true, session});

      if(!deletedUser){
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user")
      }

      await session.commitTransaction();
      await session.endSession();

      return deletedStudent;
    }catch(err){
      await session.abortTransaction();
      await session.endSession();
    }
  
    
    }



export const StudentServices = {
    getAllStudents,
    getSingleStudent,
    deleteStudent,
    updateStudent
}