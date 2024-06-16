import mongoose from "mongoose";
import { TErrorSourse } from "../interface/error";

const handleValidationError = (err : mongoose.Error.ValidationError) => {
    const statusCode = 400;
    const errorSources: TErrorSourse = Object.values(err.errors).map((val : mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
        return{
            path: val?.path,
            message: val?.message
        }

    }) 

    return{
     statusCode,
     message: "Zod Validation Error.",
     errorSources,
     
    }
}

export default handleValidationError