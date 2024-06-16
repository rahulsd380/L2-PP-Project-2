import {ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { TErrorSourse } from "../interface/error";
import config from "../config";
import handleZodError from "../errors/ZodError";

const globalErrorHabdeler : ErrorRequestHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Something went wrong!";

    

    let errorSourse: TErrorSourse = [{
        path: '',
        message: 'Something went wrong!'
    }];

    

    if(err instanceof ZodError){
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSourse = simplifiedError?.errorSources
        
    }else if(err?.name === "ValidationError"){
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSourse = simplifiedError?.errorSources
    }



    

    return res.status(statusCode).json({
     success: false,
     message,
     errorSourse,
     stack: config.node_env === "development" ?  err?.stack : null,
    })
   }

   export default globalErrorHabdeler;