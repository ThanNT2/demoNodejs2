import * as services from "../services"
import { interalServerError, badRequest } from "../middleware/handle_errors";
import { title, image, category_code, price, available, bookId, bookIds, bookName } from "../helpers/joi_schema";
import Joi from "joi";
const cloudinary = require('cloudinary').v2;

///read
export const getBooks = async (req, res) => {
    console.log("dkm controller book =", req.query)
    try {
        const response = await services.getBooks(req.query)
        return res.status(200).json(response)

    } catch (error) {
        return interalServerError(res)
    }
}
//create
export const createNewBook = async (req, res) => {
    console.log("dkm controller book =", req.body)
    try {
        // if (!req.body?.title || !req.body?.price || !req.body?.available || !req.body?.category_code || !req.body?.image) {
        //     return res.status(400).json({
        //         err: 1,
        //         mes: 'Missing input'
        //     })
        // }
        const fileData = req.file;
        const { error } = Joi.object({ title, image, category_code, price, available }).validate({ ...req.body, image: fileData?.path })
        if (error) {
            if (fileData) {
                cloudinary.uploader.destroy(fileData.filename)
            }
            return badRequest(error.details[0].message, res)
        }
        const response = await services.createNewBook(req.body, fileData)
        return res.status(200).json(response)

    } catch (error) {
        return interalServerError(res)
    }
}
//update
export const updateBook = async (req, res) => {

    try {
        const fileData = req.file;
        console.log("dkm controller book =", req.body)
        const { error } = Joi.object({ bookId }).validate({ bookId: req.body.bookId })
        if (error) {
            if (fileData) {
                cloudinary.uploader.destroy(fileData.filename)
            }
            return badRequest(error.details[0].message, res)
        }
        const response = await services.updateBook(req.body, fileData)
        return res.status(200).json(response)

    } catch (error) {
        return interalServerError(res)
    }
}
//delete
export const deleteBook = async (req, res) => {

    try {
        // const fileData = req.file;

        const { error } = Joi.object({ bookIds, bookName }).validate(req.query)
        if (error) {
            return badRequest(error.details[0].message, res)
        }
        console.log("dkm controller book =", req.query.bookIds)
        const response = await services.deleteBook(req.query.bookIds, req.query.bookName)
        return res.status(200).json(response)

    } catch (error) {
        return interalServerError(res)
    }
}