import  express from 'express';
import { getAll,addNew,deleteTodo } from './controllers/UserControllers.js';
import { IsAuthenticatedMiddleware } from '../common/IsAuthenticatedMiddleware.js';
const router=express.Router();
router.get("/all", IsAuthenticatedMiddleware, getAll);



router.post("/add",IsAuthenticatedMiddleware,addNew);



router.patch("/user",(req,res)=>{
    res.send("Under maintainance")
});


router.delete("/user",IsAuthenticatedMiddleware,deleteTodo);


export default router;