import { Schema, model, connect } from "mongoose";
import { IStudent } from "./student.interface";

const studentSchema = new Schema<IStudent>({
  id: { type: Number },
  name: {
    firstName: { type: String, required: true },
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
  email: { type: String, required: true },
  profileImg: { type: String, required: true },
});
export const Student = model<IStudent>("Student", studentSchema);
