const express = require('express');
const TaskRouter = express.Router();
const cors = require('cors')
const taskmodel = require('../Model/taskmodel')
const verifyToken = require('../middleware/AuthUser')
const cookieParser = require('cookie-parser')


TaskRouter.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));
TaskRouter.use(express.json());
TaskRouter.use(cookieParser())
TaskRouter.use(express.urlencoded({extended: true}));


TaskRouter.get('/', verifyToken, ((req,res)=>{
    res.send('task router')
    
}))


TaskRouter.post('/addtask', verifyToken,(async(req,res)=>{
    const {title, content} = req.body
    const createTask =  await taskmodel.create({
        title, 
        content,
        user: req.user.id
    })
    await createTask.save()
    .then((result)=>{
        if(!result) return res.status(400).json({message: 'Err creating Task...'})
            res.status(200).json({message: 'task ctreated', result})
            
    })
    
}))

TaskRouter.get('/getTasks', verifyToken, ((req,res)=>{
    taskmodel.find({user: req.user.id}).select('-_id')
    .then(result=> res.status(200).json({result}))
    
}))





module.exports = TaskRouter