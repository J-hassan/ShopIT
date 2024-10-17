import catchAsyncErrors from "./catchAsyncErrors.js";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import ErrorHandler from "../utils/errorHandler.js";


export const isAuthenticatedUser = catchAsyncErrors( async (req,res,next) => {

    const token = req.cookies.token;

    if(!token){
        return next(new ErrorHandler("Please login first to access this resource",401));
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    next();

});


export const AuthorizeRoles = (...roles) => {

    return (req,res,next) => {

        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role (${req.user.role}) is not allowed to access this resource`,403));
        }

        next();

    }

}