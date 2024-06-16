import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentValidations } from './academicDepartment.validation';
import { AcademicDepartmentControllers } from './academicDepartment.controller';
const router = express.Router();

router.post('/create-academic-department', validateRequest(AcademicDepartmentValidations.createAcademicDepartmentValidation), AcademicDepartmentControllers.createAcademicDepartment);
router.get('/:id',  AcademicDepartmentControllers.getSingleAcademicDepartmentById);
router.get('/', AcademicDepartmentControllers.getAllAcademicDepartment);

export const AcademicDepartmentsRoute = router;