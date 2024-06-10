import { Router } from "express";
import { userRoutes } from "../modules/users/users.route";
import { StudentRoutes } from "../modules/student/student.route";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.route";
import { AcademicFacultiesRoute } from "../modules/academicFaculty/academicFaculty.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/students",
    route: StudentRoutes,
  },
  {
    path: "/academic-semesters",
    route: AcademicSemesterRoutes,
  },
  {
    path: "/academic-faculties",
    route: AcademicFacultiesRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
