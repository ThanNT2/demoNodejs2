import * as services from "../services"
import { interalServerError, badRequest } from "../middleware/handle_errors";
// import { email, password } from "../helpers/joi_schema";
// import joi from 'joi'

export const getCurrent = async (req, res) => {
    try {
        const { id } = req.user
        const response = await services.getOne(id)
        return res.status(200).json(response)

    } catch (error) {
        return interalServerError(res)
    }
}

/// get all user
export const getallUser = async (req, res) => {
    console.log("get all user ctrl =", req.query)
    try {
        const response = await services.getallUser(req.query)
        return res.status(200).json(response)

    } catch (error) {
        return interalServerError(res)
    }
}