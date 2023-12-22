import db from '../models'
// import { query } from 'express'
import { Op } from 'sequelize'
import { v4 as generateId } from 'uuid'
const cloudinary = require('cloudinary').v2;

///Read
export const getBooks = ({ page, limit, order, name, available, ...query }) => new Promise(async (resolve, reject) => {
    try {
        const queries = { raw: true, nest: true }
        const offset = (!page || +page <= 1) ? 0 : (+page - 1)
        const flimit = +limit || +process.env.LIMIT_BOOK
        queries.offset = offset * flimit
        queries.limit = flimit
        if (order) {
            queries.order = [order]
        }
        if (name) {
            query.title = { [Op.substring]: name }
        }
        if (available) {
            query.available = { [Op.between]: available }
        }

        const response = await db.Book.findAndCountAll({
            where: query,
            ...queries,
            attributes: {
                exclude: ['category_code']
            },
            include: [
                { model: db.Category, attibutes: { exclude: ['createAt', 'updatedAt'] }, as: 'categoryData' }
            ]


        })
        resolve({
            err: response ? 0 : 1,
            mes: response ? 'GOT' : 'Cannot found books',
            bookData: response
        })
        return
    } catch (error) {
        reject(error)
    }
})
///Create
export const createNewBook = (body, fileData) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Book.findOrCreate({
            where: { title: body?.title },
            defaults: {
                ...body,
                id: generateId(),
                image: fileData?.path,
                filename: fileData?.filename
            }
        })
        resolve({
            err: response[1] ? 0 : 1,
            mes: response[1] ? 'Created' : 'Cannot Create new book',
        })
        if (fileData && !response[1]) {
            cloudinary.uploader.destroy(fileData.filename)
        }
    } catch (error) {
        reject(error)
        if (fileData && !response[1]) {
            cloudinary.uploader.destroy(fileData.filename)
        }
    }
})
///Update
export const updateBook = ({ bookId, ...body }, fileData) => new Promise(async (resolve, reject) => {
    try {
        if (fileData) {
            body.image = fileData?.path
        }
        const response = await db.Book.update(body, {
            where: { id: bookId }
        })
        resolve({
            err: response[0] > 0 ? 0 : 1,
            mes: response[0] > 0 ? `${response[0]} book(s)` : 'Cannot update book/ Book ID not found',
        })
        if (fileData && !response[0] === 0) {
            cloudinary.uploader.destroy(fileData.filename)
        }
    } catch (error) {
        reject(error)
        if (fileData && !response[1]) {
            cloudinary.uploader.destroy(fileData.filename)
        }
    }
})
///Delete
export const deleteBook = (bookIds, bookName) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Book.destroy({
            where: { id: bookIds }
        })
        resolve({
            err: response > 0 ? 0 : 1,
            mes: `${response} book(s) deleted`
        })
        // if (fileData) {
        cloudinary.api.delete_resources(bookName)
        // }
    } catch (error) {
        reject(error)
    }
})