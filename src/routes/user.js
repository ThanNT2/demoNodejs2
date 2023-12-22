import * as controllers from '../controllers';
import express from 'express';
import verifyToken from '../middleware/verify_token';

//public routes

const router = express.Router();


//private routes

router.use(verifyToken)
router.get('/', controllers.getCurrent)
// router.get('/allUser', controllers.getallUser)




module.exports = router;