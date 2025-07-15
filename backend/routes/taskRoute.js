const express = require('express');
const router = express.Router();
const { getTasks, postTask, putTask, delTask } = require('../controllers/taskController');

router.get('/', async (req, res) =>{
    try{
        const data = await getTasks();
        res.status(200).json(data);
    }
    catch(error){
        res.status(500).json({ message: "Error retrieving tasks.", error: error.message });
    }
})

router.post('/', async (req, res) =>{
    const {taskName} = req.body;

    try{
        const { taskID } = await postTask(taskName);
        res.status(201).json({ message: "Task created successfully.", taskID});
    }
    catch(error){
        res.status(500).json({ message: "Error inserting task to database.", error: error.message });
    }
})

router.put('/:id', async (req, res) =>{
    const id = req.params.id;
    const { taskName, completed } = req.body;

    try{
        await putTask(id, taskName, completed);
        res.status(200).json({ message: "Task modified successfully."});
    }
    catch(error){
        res.status(500).json({ message: "Error modifying task.", error: error.message });
    }
})

router.delete('/:id', async (req, res) =>{
    const id = req.params.id;
    try{
        await delTask(id);
        res.status(200).json({ message: "Task deleted successfully."});
    }
    catch(error){
        res.status(500).json({ message: "Error deleting task.", error: error.message });
    }
})

module.exports = router;