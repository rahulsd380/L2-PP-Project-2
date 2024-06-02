import Joi from "joi";


 // creatint Joi schema
const StudentJoiSchema = Joi.object({
    id: Joi.string(),
    name: {
        firstName: Joi.string().max(20).required(),
        middleName: Joi.string(),
        lastName: Joi.string().max(20).required(),
      },

      gender: Joi.string().valid("male", "female", "other"),
      dateOfBirth: Joi.string(),
      phoneNumber: Joi.string(),
      presentAddress: Joi.string(),
      permanentAddress: Joi.string(),
      guardian: Joi.object({
        fathersInfo: Joi.object({
          fathersName: Joi.string().required(),
          fathersOccupation: Joi.string().required(),
          fathersPhoneNo: Joi.string().required(),
        }).required(),
        mothersInfo: Joi.object({
          mothersName: Joi.string().required(),
          mothersOccupation: Joi.string().required(),
          mothersPhoneNo: Joi.string().required(),
        }).required(),
      }).required(),

      email: Joi.string().email().required(),
      profileImg: Joi.string().required(),
})

export default StudentJoiSchema;