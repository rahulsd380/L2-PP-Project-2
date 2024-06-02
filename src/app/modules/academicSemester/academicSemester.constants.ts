import { TAcademicSemesterNameCodeMapper, TMonths } from "./academicSemester.interface";

export const AcademicSemesterName = ["Autum", "Summer", "Fall"];
export const AcademicSemesterCode = ["01", "02", "03"];
export const AcademicSemesterMonths: TMonths[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const academicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
  Autum: '01',
  Summer: '02',
  Fall: '03'
};
