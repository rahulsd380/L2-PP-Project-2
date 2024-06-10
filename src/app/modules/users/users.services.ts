import config from "../../config";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
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

    const findLastStudentId = async () => {
        const lastStudent = await User.findOne({
            role: 'student'
        }, {
            id: 1,
            _id: 0
        })
        .sort({
            createdAt: -1
        })
        .lean();

        return lastStudent?.id ? lastStudent.id : undefined
    };


    const generateStudentId = async (payload: TAcademicSemester) => {
        let  currentId = (0).toString();

        const lastStudentId = await findLastStudentId();
        const lastStudentSemesterCode = lastStudentId?.substring(4,6);
        const lastStudentYear = lastStudentId?.substring(0,4);
        const currentSemesterCode = payload.code;
        const currentYear = payload.year;

        if(lastStudentId && lastStudentSemesterCode === currentSemesterCode && lastStudentYear === currentYear){
            currentId = lastStudentId.substring(6);
        }











        let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
        incrementId = `${payload.year} ${payload.code} ${incrementId}`;
        return incrementId;
    }

    // find academic semester

    const academicSemester = await AcademicSemester.findById(studentData.admissionSemester);

    if (!academicSemester) {
        throw new Error('Academic semester not found');
    }


    // setting user id
    userData.id = await generateStudentId(academicSemester); 

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