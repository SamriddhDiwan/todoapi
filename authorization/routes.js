import express from "express";
import {login, register} from './controllers/AuthorizationController.js';

const router =express.Router();

router.post('/login',login);
router.post('/new',register);

export default router;