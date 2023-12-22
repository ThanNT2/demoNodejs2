import * as controllers from '../controllers';
import express from 'express';

//public routes
const router = express.Router();

router.get('/', controllers.insertData)



export default router;