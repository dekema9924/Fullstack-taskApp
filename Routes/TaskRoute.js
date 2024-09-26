const express = require('express');
const TaskRouter = express.Router();
const cors = require('cors')
const taskmodel = require('../Model/taskmodel')
const verifyToken = require('../middleware/AuthUser')
const cookieParser = require('cookie-parser')


TaskRouter.use(cors({
    credentials: true,
    origin: 'https://fullstack-taskapp.onrender.com',
}));
TaskRouter.use(express.json());
TaskRouter.use(cookieParser())
TaskRouter.use(express.urlencoded({ extended: true }));


TaskRouter.get('/', verifyToken, ((req, res) => {
    res.send('task router')

}))


TaskRouter.post('/addtask', verifyToken, (async (req, res) => {
    const { title, content } = req.body
    const createTask = await taskmodel.create({
        title,
        content,
        user: req.user.id
    })
    await createTask.save()
        .then((result) => {
            if (!result) return res.status(400).json({ message: 'Err creating Task...' })
            res.status(200).json({ message: 'task ctreated', result })

        })

}))

TaskRouter.get('/getTasks', verifyToken, ((req, res) => {
    taskmodel.find({ user: req.user.id })
        .then(result => res.status(200).json({ result }))

}))

TaskRouter.get('/delete/:id', (async (req, res) => {
    const {id }= req.params
    await taskmodel.findByIdAndDelete(id)
        .then((deletedTask) => {
                try{
                    if (deletedTask) {
                        res.status(200).json({message:'task deleted successfully', deletedTask});
                    } else {
                        console.log('task not found');
                    }
                    
                }catch(err){
                    console.error('Error deleting task:', err);

                }

        })


}))




module.exports = TaskRouter