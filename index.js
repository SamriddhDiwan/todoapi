import express from 'express';
import morgan from 'morgan';
import AuthorizationRoutes from './authorization/routes.js';
import Userrouter from './users/routes.js';
import bodyParser from 'body-parser';

const app=express();
const port=3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/',AuthorizationRoutes);
app.use('/user',Userrouter);



app.listen(port, () => {console.log(`Server started on ${port}`)})