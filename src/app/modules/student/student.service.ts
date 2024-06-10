import { IStudent } from "./student.interface";
import { Student } from "./student.model";


// Here it will be getAllStudents, getStudentById and other find or some operations (Later)
  // Fetching all the data from database
  const getAllStudents = async () => {
    // Fetching all the data from database
    const result = await Student.find();
    return result;
  };


  const getSingleStudent = async (id: string) => {
    const result = await Student.aggregate([{ $match: { id } }]);
    return result;
  };


export const StudentServices = {
    getAllStudents,
    getSingleStudent,
}