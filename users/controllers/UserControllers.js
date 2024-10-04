import pg from 'pg';

const db = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'todoapi',
    password: 'Samriddh@2004',
    port: 5432,
});
db.connect();



export const addNew=async (req,res)=>{
    const user_id=req.body.user_id;
    const newTodo=req.body.todo;
    let result= await db.query("insert into todoList(user_id,todo) values($1,$2)",[user_id,newTodo]);
    let todoList=[];
    return res.redirect('/user/all');
}

export const getAll=async (req,res)=>{
    const user_id=req.body.user_id;
    let result= await db.query("select todo,id from todoList where user_id=$1",[user_id]);
    let todoList=[];
    result.rows.forEach(todo => {
        todoList.push([todo.id,todo.todo]);
    });
    return res.json({
        status:true,
        data:todoList
    });
}

export const deleteTodo=async (req,res)=>{
    const user_id=req.body.user_id;
    let result= await db.query("select todo,id from todoList where user_id=$1",[user_id]);
    let todoList=[];
    result.rows.forEach(todo => {
        todoList.push([todo.id,todo.todo]);
    });
    return res.json({
        status:true,
        data:todoList
    });
}