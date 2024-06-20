import express from 'express';
import { CourseValidations } from './course.validation';
import { CourseControllers } from './course.controller';
import validateRequest from '../../middlewares/validateRequest';
const router = express.Router();

router.post('/create-course', validateRequest(CourseValidations.createCourseValidationSchema), CourseControllers.createCourse);
router.get('/:id',  CourseControllers.getSingleCourse);
router.get('/', CourseControllers.getAllCourses);
router.delete('/', CourseControllers.deleteCourse);
router.patch('/:id', validateRequest(CourseValidations.updateCourseValidationSchema), CourseControllers.updateCourse);

export const CourseRoutes = router;