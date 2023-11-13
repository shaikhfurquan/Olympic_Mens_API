
import express from "express";
import {userRegister , userLogin, userLogout , getMyProfile} from "../controllers/userController.js";
import isAuthenticated from "../middlewares/auth.js";

const router = express.Router();


router.post('/register', userRegister)
router.post('/login', userLogin)
router.get('/logout', userLogout)
router.get('/myprofile', isAuthenticated , getMyProfile)


export default router

