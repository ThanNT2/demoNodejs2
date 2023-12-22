import db from '../models'
// import { query } from 'express'
import { Op } from 'sequelize'
import { v4 as generateId } from 'uuid'
const cloudinary = require('cloudinary').v2;

///Read
export const getAllUsers = ({ page, limit, order, name, available, ...query }) => new Promise(async (resolve, reject) => {
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

        const response = await db.User.findAndCountAll({
            where: query,
            // ...queries,
            attributes: {
                exclude: ['password', 'role_code']
            },
            include: [
                {
                    model: db.Role, as: 'roleData', attributes: ['id', 'code', 'value']
                }
            ]
        })
        resolve({
            err: response ? 0 : 1,
            mes: response ? 'GOT' : 'Cannot found books',
            UserDatas: response
        })
        return
    } catch (error) {
        reject(error)
    }
})
//Update
export const updateUser = ({ userId, ...body }) => new Promise(async (resolve, reject) => {
    console.log("dkm update sever user")
    try {
        // if (fileData) {
        //     body.image = fileData?.path
        // }
        const response = await db.User.update(body, {
            where: { id: userId }
        })
        resolve({
            err: response[0] > 0 ? 0 : 1,
            mes: response[0] > 0 ? `${response[0]} user(s)` : 'Cannot update user/ User ID not found',
        })
        // if (fileData && !response[0] === 0) {
        //     cloudinary.uploader.destroy(fileData.filename)
        // }
    } catch (error) {
        reject(error)
        // if (fileData && !response[1]) {
        //     cloudinary.uploader.destroy(fileData.filename)
        // }
    }
})