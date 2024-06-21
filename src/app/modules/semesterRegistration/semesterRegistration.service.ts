import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { RegistrationStatus } from "./semesterRegistration.constants";

const createSemesterRegistration = async (payload: TSemesterRegistration) => {
  const academicSemester = payload?.academicSemester;

  //Check if there any registered semester is already upcoming or ongoing

  const isThereAnyUpcomingOrOngoingSemester =
    await SemesterRegistration.findOne({
      $or: [{ status: RegistrationStatus.UPCOMING }, { status: RegistrationStatus.ONGOING }],
    });

    if (isThereAnyUpcomingOrOngoingSemester) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          `There is already an ${isThereAnyUpcomingOrOngoingSemester.status} registered semester !`
        );
      }

  // Check if the academic semster exists
  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);
  if (!isAcademicSemesterExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This academic semester not found."
    );
  }

  // Check if the academic semster is already exists
  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  });
  if (isSemesterRegistrationExists) {
    throw new AppError(httpStatus.CONFLICT, "This semester is already exists.");
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistration = async (query: Record<string, unknown>) => {
  const semssterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate("academicSemester"),
    query
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semssterRegistrationQuery.modelQuery;
  return result;
};

const getSingleSemesterRegistration = async (id: string) => {
  const result = await SemesterRegistration.findById(id);
  return result;
};

const updateSemesterRegistration = async (id: string, payload: Partial<TSemesterRegistration>) => {

    //Check if the requested semester exist in database or not.
    const isSemesterExists = await SemesterRegistration.findById(id);
    if (!isSemesterExists) {
        throw new AppError(
          httpStatus.NOT_FOUND,
          `This semester doesn't exists !`
        );
      }



    //If the requested semester is ENDED, then will not update anything.
  const currentSemesterStatus = isSemesterExists?.status;
  const requestedSemesterStatus = payload.status;
  if (currentSemesterStatus === RegistrationStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semester is ${currentSemesterStatus} !`
    );
  }


  // Anyone can not do please change the status to upcoming to end it and ended two upcoming oriented to ongoing.
  if (currentSemesterStatus === RegistrationStatus.UPCOMING && requestedSemesterStatus === RegistrationStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You cannot directly change status from ${currentSemesterStatus} to ${requestedSemesterStatus} !`
    );
  }

  if (currentSemesterStatus === RegistrationStatus.ONGOING && requestedSemesterStatus === RegistrationStatus.UPCOMING) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You cannot directly change status from ${currentSemesterStatus} to ${requestedSemesterStatus} !`
    );
  }


  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true
  })

  return result;




};

export const SemesterRegistrationService = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration
};
