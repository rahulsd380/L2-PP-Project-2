import { Schema, model, connect } from "mongoose";
import { IStudent, StudentModel } from "./student.interface";
import validator from 'validator';


const studentSchema = new Schema<IStudent, StudentModel>({
  id: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User id is required'],
    unique: true,
    ref: 'User',
  },
  name: {
    firstName: { type: String, required: [true, 'First name is required'], maxlength : [20, 'Max length is 20!'], trim : true },
    middleName: { type: String },
    lastName: { type: String, required: true },
  },
  gender: ["male", "female", "other"],
  dateOfBirth: { type: String },
  phoneNumber: { type: String },
  presentAddress: { type: String },
  permanentAddress: { type: String },
  guardian: {
    fathersInfo: {
      fathersName: { type: String, required: true },
      fathersOccupation: { type: String, required: true },
      fathersPhoneNo: { type: String, required: true },
    },
    mothersInfo: {
      mothersName: { type: String, required: true },
      mothersOccupation: { type: String, required: true },
      mothersPhoneNo: { type: String, required: true },
    },
  },
  admissionSemester: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicSemester'

  },
  email: { type: String, 
    required: true,
    validate : {
      validator : (value : string) => validator.isEmail(value),
      message : "Email is not correct."
    }
  },
  profileImg: { type: String, required: true },
});




// for creating static
studentSchema.statics.isStudentExists = async function(id : string){
  const existingStudent = Student.findOne({id});
  return existingStudent;
}

//; for creating instance
// studentSchema.methods.isStudentExists = async function(id : string){
//   const existingStudent = Student.findOne({id});
//   return existingStudent;
// }



export const Student = model<IStudent, StudentModel>("Student", studentSchema);



// trim:true is used so that if there is any white space it should not save with the spaces. It will just save the value, not the whitespace.
