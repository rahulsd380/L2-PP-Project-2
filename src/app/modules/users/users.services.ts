import mongoose from "mongoose";
import config from "../../config";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { IStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./users.interface";
import { User } from "./users.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createStudentIntoDB = async (studentData: IStudent, password: string) => {
  // Creating user object
  const userData: Partial<TUser> = {};

  // if user doesn't provide any password than use default password
  userData.password = password || (config.default_password as string);

  // Set role
  userData.role = "student";

  const findLastStudentId = async () => {
    const lastStudent = await User.findOne(
      {
        role: "student",
      },
      {
        id: 1,
        _id: 0,
      }
    )
      .sort({
        createdAt: -1,
      })
      .lean();

    return lastStudent?.id ? lastStudent.id : undefined;
  };

  const generateStudentId = async (payload: TAcademicSemester) => {
    let currentId = (0).toString();

    const lastStudentId = await findLastStudentId();
    const lastStudentSemesterCode = lastStudentId?.substring(4,6);
    const lastStudentYear = lastStudentId?.substring(0,4);
    const currentSemesterCode = payload.code;
    const currentYear = payload.year;

    if (
      lastStudentId &&
      lastStudentSemesterCode === currentSemesterCode &&
      lastStudentYear === currentYear
    ) {
      currentId = lastStudentId.substring(6);
    }

    let incrementId = (Number(currentId)+1).toString().padStart(4,"0");
    incrementId = `${payload.year}${payload.code}${incrementId}`;
    return incrementId;
  };

  // find academic semester

  const academicSemester = await AcademicSemester.findById(
    studentData.admissionSemester
  );

  if (!academicSemester) {
    throw new Error("Academic semester not found");
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // setting user id
    userData.id = await generateStudentId(academicSemester);

    // trancaction-1
    // Create a user
    const newUser = await User.create([userData], { session });

    // Create a student

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user.");
    }
    studentData.id = newUser[0].id;
    studentData.user = newUser[0]._id;

    // trancaction-2
    const newStudent = await Student.create([studentData], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student.");
    }

    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const UserServices = {
  createStudentIntoDB,
};