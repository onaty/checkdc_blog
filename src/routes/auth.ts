import express from 'express';
const router = express.Router();

// controller
import * as authCtrl from '../controllers/authCtrl'; 

// routes
router.post('/login', authCtrl.login);
router.post('/signup', authCtrl.signupUser);

export default router;
