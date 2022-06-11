const { db } = require('../models/Task');
const Task = require('../models/Task'); 

class TaskController {

    static async getAllTasks(req, res) {
        const tasks = await Task.find().lean();

        if(!tasks) {
            res.json({ message: "Something went wrong"})
        } else {
            res.status(200).json({ tasks }) 
        }
    }


    static async createTask(req, res) {
        const { _id, title, time, done } = req.body
        const newTask = Task({ _id, title, time, done });

        if(!newTask) {
            res.json({ message: "Something went wrong"});
        } else {
            await newTask.save();
            res.status(200).json({ newTask });
        }                            
    }


    static async editTask(req, res) {
        const { _id, title, time } = req.body

        await Task.findByIdAndUpdate(_id, { title, time });

        if(title === '' && time === '' ) {
            res.json({ message: "Something went wrong"});
        } else {
            res.status(200).json({ message: `Task id: ${_id} updated` })  
        }
       
    }


    static async deleteTask(req, res) {
        const { id } = req.params;
        await Task.findByIdAndDelete(id);

        if(!id) {
            res.json({ message: "Something went wrong"});
        } else {
            res.status(200).json({ message: `Task id: ${id} deleted` })  
        }               
    }

    
    static async deleteAllTasks(req, res) {

       const tasksToDelete = await db.collection('tasks').deleteMany({})

        if(!tasksToDelete) {
            res.json({ message: "Something went wrong"});
        } else {
            res.status(200).json({ message: `All tasks deleted` }) 
        }  
       

    }


    static async updateStatus(req, res) {
        const { _id, done } = req.body

        await Task.findByIdAndUpdate( _id, { done })

        if(done === false) {
            res.json({ message: "Something went wrong"});
        } else if ((done === true)) {           
            res.status(200).json({ message: "Status Updated" });
        }               
    }

}

module.exports = TaskController;