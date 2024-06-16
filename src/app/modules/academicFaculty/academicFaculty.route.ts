import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyControllers } from './academicFaculty.controller';
import { AcademicFacultyValidations } from './academicFaculty.validation';
const router = express.Router();

router.post('/create-academic-faculty', validateRequest(AcademicFacultyValidations.createAcademicFacultyValidation), AcademicFacultyControllers.createAcademicFaculty);
router.get('/:id',  AcademicFacultyControllers.getSingleAcademicFacultyById);
router.get('/', AcademicFacultyControllers.getAllAcademicFaculty);

export const AcademicFacultiesRoute = router;