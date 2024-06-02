import config from "../../config";
import { IStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { NewUser, TUser } from "./users.interface";
import { User } from "./users.model";

const createStudentIntoDB = async (studentData : IStudent, password: string) => {
 
    // Creating user object
    const userData : Partial<TUser> = {};

    // if user doesn't provide any password than use default password
    userData.password= password || (config.default_password as string)
   
    // Set role
    userData.role = 'student'


    // setting user id
    userData.id = '202466001' 

    // Create a user
    const newUser = await User.create(userData);

    // Create a student

    if(Object.keys(newUser).length){
        studentData.id = newUser.id;
        studentData.user = newUser._id

        const newStudent = await Student.create(studentData)
        return newStudent
    }
};


export const UserServices = {
    createStudentIntoDB
}