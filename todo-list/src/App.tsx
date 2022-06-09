import './App.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCheckDouble } from 'react-icons/fa';
import {
  BsPlusLg,
  BsCheckSquareFill,
  BsCheckSquare,
  BsTrashFill,
} from 'react-icons/bs';
import { GiNothingToSay } from 'react-icons/gi';
import { SiFitbit } from 'react-icons/si'; 
import { FiEdit } from 'react-icons/fi'; 
import { ITask } from './Interfaces'


function App() {

  const [tasks, setTasks] = useState<ITask[]>([]); 
  const [title, setTitle] = useState<string>(''); 
  const [time, setTime] = useState<string>(''); 
  const [isLoading, setIsLoading ] = useState(true); 

  
  useEffect(() => {
      axios.get('http://localhost:3001/tasks')
      .then((response) => {
        setTasks(response.data.tasks);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setIsLoading(false)
      })

    }, [])
    

    const handleCreate = (): void => {
      axios.post('http://localhost:3001/tasks/create', { title, time })
    .then((response) => {
      const newTask = {_id: '', title: title, time: time, done: false}
        setTasks([...tasks, newTask]);

        setTitle('');
        setTime('');
  
  
    })
    .catch((err) => console.error(err))
    }


    // const handleEdit = (_id: string): void => {
    //   const newTitle = prompt('Informe o novo título')
    //   const newTime = prompt('Informe o novo horário')      
  
    //   axios.put('http://localhost:3001/tasks/edit', { newTitle: newTitle, newTime: newTime 
    //   }).then(() => {
    //     setTasks(tasks.map((el: any) => {
    //       return el._id == _id ? { _id: '', title: newTitle, time: newTime } : el
    //     }))
    //   }).catch((err) => console.error(err))
      
    // }

    const handleEdit = (_id: string): any => {
      const newTitle = prompt('Informe o novo título')
      const newTime = prompt('Informe o novo horário')      

      axios.put('http://localhost:3001/tasks/edit', { _id, newTitle: newTitle, newTime: newTime 
      }).then(() => {

          setTasks(tasks.map((task: any) => {
          return task._id === _id ? { _id, title: newTitle, time: newTime, done: false } : task
          }))
      // }).catch((err) => console.error(err))

        // const editedTask = { _id: _id, title: newTitle, time: newTime, done: false }
        // console.log(editedTask)
        // setTasks(tasks.filter((task: ITask) => {
        //   return task._id !== _id ? [...tasks, editedTask]  : task
        // }))        


        // setTasks(tasks.filter((task: ITask) => {
        //   return task._id === _id ? (task === editedTask) : task ))
        // }

      })      
      .catch((err) => console.error(err))      
    }

    const handleDelete = (_id: string): void => {
        axios.delete(`http://localhost:3001/tasks/delete/${_id}`)
        .then(() => {

          setTasks(tasks.filter((task: ITask) => {
            return task._id != _id
          }))

        })
    }

    const handleDone = (_id: string, task: ITask): void  => {      
        task.done = !task.done
        const title = task.title
        const time = task.time  
      
        axios.put(`http://localhost:3001/tasks/status/${_id}`, { done: false }
      ).then((response) => {         

        const taskDone = { _id: _id, title, time, done: task.done }
        console.log(taskDone)
          setTasks(tasks.map((task: ITask): any => {          
            return  task._id === _id ? taskDone : task;          
        }))

       
        // const taskDone = { _id: '', done: task.done }
        // setTasks(tasks.filter((task: any) => {
        //   return  task._id !== _id   

        // }))
      })
      .catch((err) => console.error(err))      
    }
    

  
  return (
    <div className="App">
      <header>
        <h2><FaCheckDouble color='#F66B0E' /> Minhas Tarefas</h2>
      </header>

      <div className="inputs">   
        <input type="hidden" name="_id"/>
        <input
        onChange={(ev) => {setTitle(ev.target.value)}}
        type="text"
        name="title"
        placeholder="A fazer..."
        value={title}/>

        <input
        onChange={(ev) => {setTime(ev.target.value)}}
        type="text"
        name="time"
        placeholder="Horário"
        value={time}/>
        
        <button
        onClick={handleCreate}
        title="Adicionar"><BsPlusLg /></button>
      </div>

      <div className="divider"></div>     
      <div className="task-container">    
                               
        {isLoading && <p id="loading">Carregando...</p> }

         {tasks.length === 0 && <p className="message">
        <GiNothingToSay /> Nenhuma tarefa adicionada.</p> }  

        {tasks?.map((task: ITask, key: number ) => {                  
                       
          return(
            <div className="task-list" key={key}>
              <div>     
                <h4 className={task.done ? 'task-done' : ''} >
                  <SiFitbit color='#F66B0E' size={14} /> {task.title}</h4>
                <p>Horário: {task.time}h</p>
              </div>

              <div className="actions">
                <span onClick={() => handleDone(task._id, task)}>
                  {!task.done ? <BsCheckSquare size={20} /> : <BsCheckSquareFill color='#F66B0E' size={20} /> }
                </span>
                <span onClick={() => handleEdit(task._id)}>
                  <FiEdit size={20} />
                </span>
                <span onClick={() => handleDelete(task._id)}>
                  <BsTrashFill size={20} />
                </span>
              </div>
            </div>
            )
        })}
      </div>
    </div>
  )
}

export default App;
