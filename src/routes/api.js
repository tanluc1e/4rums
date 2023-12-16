import express from 'express';

const apiRouter = express.Router();
import { verifyAccessToken } from '../modules/utils/jwt.js';
import { getUsers, getUser } from '../modules/controllers/generalController.js'
import { getProfile, uploadUserPicture, setOnline } from '../modules/controllers/profileController.js'

apiRouter.get('/users', getUsers)
apiRouter.get('/user', verifyAccessToken, getUser)

apiRouter.get('/profile', verifyAccessToken, getProfile)
apiRouter.post('/profile/upload/picture', verifyAccessToken, uploadUserPicture)
apiRouter.post('/profile/setOnline', verifyAccessToken, setOnline)

apiRouter.get('/', (req, res) => {
    res.json({ route: 'Auth router' })
})

export default apiRouter;
