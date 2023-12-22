import * as services from "../services"
import { interalServerError, badRequest } from "../middleware/handle_errors";
import { name, avatar, email, password, userId } from "../helpers/joi_schema";
import Joi from "joi";


///read
export const getAllUsers = async (req, res) => {
    console.log("dkm controller all users =", req.query)
    try {
        const response = await services.getAllUsers(req.query)
        console.log("dkm controller all users =", response)
        return res.status(200).json(response)

    } catch (error) {
        return interalServerError(res)
    }
}
//update
export const updateUser = async (req, res) => {
    console.log("dkm controller user Id", req.body.userId)
    try {
        // const fileData = req.file;
        console.log("dkm controller user =", req.body)
        const { error } = Joi.object({ userId }).validate({ userId: req.body.userId })
        if (error) {
            // if (fileData) {
            //     cloudinary.uploader.destroy(fileData.filename)
            // }
            console.log("error controller")
            return badRequest(error.details[0].message, res,)
        }
        const response = await services.updateUser(req.body)
        console.log("dkm controller response =", response)
        return res.status(200).json(response)

    } catch (error) {
        return interalServerError(res)
    }
}