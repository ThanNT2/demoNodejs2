
import user from './user';
import allusers from './allusers';
import auth from './auth';
import insert from './insert';
import book from './book';
import { notFound } from '../middleware/handle_errors';

const initRouter = (app) => {
    app.use('/api/v1/user', user)
    app.use('/api/v1/allUser', allusers)
    app.use('/api/v1/auth', auth)
    app.use('/api/v1/insert', insert)
    app.use('/api/v1/book', book)

    app.use(notFound)
}
module.exports = initRouter