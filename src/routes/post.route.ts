import express from 'express';
const router = express.Router();

// controller
import * as postCtrl from '../controllers/postCtrl'; 
import { AuthenticateUserToken } from '../middleware/token';

// routes
router.post('/createpost', [AuthenticateUserToken],  postCtrl.createPost);
router.get('/fetchallposts', postCtrl.paginatePosts);

export default router;
