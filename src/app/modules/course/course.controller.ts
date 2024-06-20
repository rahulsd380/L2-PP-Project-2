import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CourseServices } from "./course.service";

const createCourse = catchAsync(async (req, res) => {
    const result = await CourseServices.createCourse(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Course created successfully",
        data: result,
      });
});

const getAllCourses = catchAsync(async (req, res) => {
    const result = await CourseServices.getAllCourses(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Course fetched successfully",
        data: result,
      });
});

const getSingleCourse = catchAsync(async (req, res) => {
    const {id} = req.params;
    const result = await CourseServices.getSingleCourse(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Course fetched successfully",
        data: result,
      });
});

const deleteCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CourseServices.deleteCourse(id);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Course is deleted succesfully',
      data: result,
    });
  });

const updateCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CourseServices.updateCourse(id, req.body);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Course is deleted succesfully',
      data: result,
    });
  });

export const CourseControllers = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    deleteCourse,
    updateCourse
}