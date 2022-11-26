
import express from 'express';
import { checkUserExistance, getLoggedInUser, googleOAuth, login, register} from '../Controllers/auth.controllers.js';

const userRouter = express.Router()


userRouter.post('/login', login)
userRouter.post('/register', register)
userRouter.get('/getLoggedInUser', getLoggedInUser)
userRouter.post('/userExist', checkUserExistance)
userRouter.get('/googleOAuth', googleOAuth)

export default userRouter