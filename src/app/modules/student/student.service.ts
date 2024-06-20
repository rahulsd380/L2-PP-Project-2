import mongoose, { startSession } from "mongoose";
import { IStudent } from "./student.interface";
import { Student } from "./student.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { User } from "../users/users.model";
import QueryBuilder from "../../builder/QueryBuilder";

// Here it will be getAllStudents, getStudentById and other find or some operations (Later)
// Fetching all the data from database

const getAllStudents = async (query: Record<string, unknown>) => {
  let queryObj = { ...query };

  const studentSearchableFields = ["email", "name.firstName", "presentAddress"];

  // let searchTerm = '';
  // if(query?.searchTerm){
  //   searchTerm = query?.searchTerm as string
  // }

  // const searchQuery = Student.find({
  //   $or : studentSearchableFields.map((field) => ({
  //     [field] : {$regex : searchTerm, $options: 'i'}
  //   }))
  // })

  // // Filtering
  // const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
  // excludeFields.forEach(element => delete queryObj[element])

  // // Fetching all the data from database
  // const filteredQuery = searchQuery.find(queryObj)
  // .populate('admissionSemester')
  // .populate({
  //   path: 'academicDepartment',
  //   populate : {
  //     path: 'academicFaculty'
  //   }
  // });

  // // sorting
  // let sort = '-createdAt';
  // if(query.sort){
  //   sort = query.sort as string;
  // }
  // const sortQuery = filteredQuery.sort(sort);

  // // limiting and pagination
  // let limit = 1;
  // let page = 1;
  // let skip = 0;

  // if(query.limit){
  //   limit = Number(query.limit);
  // }

  // if(query.page){
  //   page = Number(query.page);
  //   skip = (page -1)*limit;
  // }

  // const paginateQuery = sortQuery.skip(skip)
  // const limitQuery = paginateQuery.limit(limit)

  // // field limiting
  // let fields = '-__v';
  // if(query.fields){
  //   fields = (query.fields as string).split(',').join(' ')
  // }

  // const fieldQuery = await limitQuery.select(fields)

  const studentQuery = new QueryBuilder(
    Student.find()
      .populate("admissionSemester")
      .populate({
        path: "academicDepartment",
        populate: {
          path: "academicFaculty",
        },
      }),

    query
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;

  return result;
};

const getSingleStudent = async (id: string) => {
  const result = await Student.findById(id)
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};

const updateStudent = async (id: string, payload: Partial<IStudent>) => {
  const { name, guardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

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

  const result = await Student.findByIdAndUpdate(id , modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteStudent = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const deletedStudent = await Student.findByIdAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete student");
    }

    const deletedUser = await User.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user");
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const StudentServices = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};
