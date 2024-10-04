import  express from 'express';
import { getAll,addNew,deleteTodo, patchTodo } from './controllers/UserControllers.js';
import { IsAuthenticatedMiddleware } from '../common/IsAuthenticatedMiddleware.js';
const router=express.Router();

router.get("/all", IsAuthenticatedMiddleware, getAll);
router.post("/add",IsAuthenticatedMiddleware,addNew);
router.patch("/patch",IsAuthenticatedMiddleware,patchTodo);
router.delete("/delete",IsAuthenticatedMiddleware,deleteTodo);

export default router;