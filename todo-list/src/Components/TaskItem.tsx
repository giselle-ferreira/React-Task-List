import React from 'react';
import '../App.css'
import { ITask } from '../Interfaces';

interface Props {
    task: ITask;
}


const TaskItem = ({ task }: Props) => {
    return <div className="listItem">
         <h4 className={task.done ? 'task-done' : ''}>
                <SiFitbit color='#F66B0E' size={14} /> {task.title}</h4>
              <p>Horário: {task.time}h</p>
            </div>
           
            <div className="actions">
              <span onClick={() => handleDone(task._id)}>
                {!task.done ? <BsCheckSquare size={20} /> : <BsCheckSquareFill color='#F66B0E' size={20} /> }
              </span>
              <span onClick={() => handleEdit(task._id)} >
                <FiEdit size={20} />
              </span>
              <span onClick={() => handleDelete(task._id)}>
                <BsTrashFill size={20} />
              </span>
    </div>
}

export default TaskItem;

{/* <div className="listItem" >           

              <h4 className={task.done ? 'task-done' : ''}>
                <SiFitbit color='#F66B0E' size={14} /> {task.title}</h4>
              <p>Horário: {task.time}h</p>
            </div>
           
            <div className="actions">
              <span onClick={() => handleDone(task._id)}>
                {!task.done ? <BsCheckSquare size={20} /> : <BsCheckSquareFill color='#F66B0E' size={20} /> }
              </span>
              <span onClick={() => handleEdit(task._id)} >
                <FiEdit size={20} />
              </span>
              <span onClick={() => handleDelete(task._id)}>
                <BsTrashFill size={20} />
              </span>
            </div> */}