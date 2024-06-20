import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { CourseSearchableFields } from "./course.constants";
import { TCourse } from "./course.interface";
import { Course } from "./course.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createCourse = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCourses = async (query: Record<any, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate("preRequisiteCourses.course"),
    query
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCourse = async (id: string) => {
  const result = await Course.findById(id).populate(
    "preRequisiteCourses.course"
  );
  return result;
};

const deleteCourse = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    }
  );
  return result;
};

const updateCourse = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...remainingCourseData } = payload;

  const session = await mongoose.startSession();
  try{
  session.startTransaction();

  const updatedBasicCourse = Course.findByIdAndUpdate(id, remainingCourseData, {
    new: true,
    runValidators: true,
    session,
  });

  if (!updatedBasicCourse) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to update course");
  }

  if (preRequisiteCourses && preRequisiteCourses.length > 0) {
    const deletedPreRequisites = preRequisiteCourses
      .filter((el) => {
        el.course && el.isDeleted;
      })
      .map((el) => el.course);

    const deletedPreRequisitesCourses = await Course.findByIdAndUpdate(
      id,
      {
        $pull: {
          preRequisiteCourses: { course: { $in: deletedPreRequisites } },
        },
      },
      {
        new: true,
        runValidators: true,
        session,
      }
    );

    if (!deletedPreRequisitesCourses) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to update course");
    }

    const newPreRequisites = preRequisiteCourses?.filter((el) => {
      el.course && !el.isDeleted;
    });

    const newPreRequisitesCourses = await Course.findByIdAndUpdate(
      id,
      {
        $addToSet: { preRequisiteCourses: { $each: { newPreRequisites } } },
      },
      {
        new: true,
        runValidators: true,
        session,
      }
    );

    if (!newPreRequisitesCourses) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to update course");
    }

    const result = Course.findById(id).populate("preRequisiteCourses.course");

    return result;
  }

  await session.commitTransaction();
  await session.endSession();

} catch(err){
    await session.abortTransaction();
  await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to update course");
}


};

export const CourseServices = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  deleteCourse,
  updateCourse,
};
