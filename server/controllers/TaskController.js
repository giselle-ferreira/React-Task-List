// const Task = require('../models/Task'); 

 
//  class TaskController {

//     static async getAllTasks(req, res) {

//         try {
//             const tasks = await Task.find().lean();
//             res.status(200).json({ tasks }) 
//         } catch (error) {
//             res.status(400).json({ message: "Something went wrong"})
//         }

//         // const tasks = await Task.find().lean();

//         // if(!tasks) {
//         //     res.json({ message: "Something went wrong"})
//         // } else {
//         //     res.status(200).json({ tasks }) 
//         // }
//     }


//     static async createTask(req, res) {

//         try {
//             const { _id, title, time, done } = req.body
//             const newTask = Task({ _id, title, time, done });

//             const allTasks = await Task.find().lean();
//             await newTask.save();
//             res.status(200).json({ newTask, allTasks: allTasks });

//         } catch (error) {
//             res.status(400).json({ message: "Something went wrong"});
//         }                          
//     }


//     static async editTask(req, res) {

//         try {
//             const { _id, title, time, done } = req.body
//             await Task.findOneAndUpdate({ _id, title, time, done })

//             const allTasks = await Task.find().lean();
//             res.status(200).json({ message: "Task Updated",  allTasks: allTasks});

//         } catch (error) {
//             res.status(400).json({ message: "Something went wrong"});
//         }    
//     }


//     static async deleteTask(req, res) {

//         try {
//             const id = await Task.findByIdAndRemove(req.params.id);

//             const allTasks = await Task.find().lean();
//             res.status(200).json({ message: `Task id: ${id} deleted`, allTasks: allTasks })

            
//         } catch (error) {
            
//         }

        

//         if(!id) {
//             res.json({ message: "Something went wrong"});
//         } else {
              
//         }               
//     }

// }

// module.exports = TaskController;


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
        const { title, time, done } = req.body
        const newTask = Task({ title, time, done });

        if(!newTask) {
            res.json({ message: "Something went wrong"});
        } else {
            await newTask.save();
            res.status(200).json({ newTask });
        }                            
    }


    static async editTask(req, res) {
        const { _id, title, time } = req.body
        await Task.findByIdAndUpdate( _id, { title, time })

        if(!title && !time) {
            res.json({ message: "Something went wrong"});
        } else {           
            res.status(200).json({ message: "Task Updated" });
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


    static async updateStatus(req, res) {
        const { _id, done } = req.body

        await Task.findByIdAndUpdate( _id, { done })

        if(!done) {
            res.json({ message: "Something went wrong"});
        } else {           
            res.status(200).json({ message: "Status Updated" });
        }               
    }

}

module.exports = TaskController;