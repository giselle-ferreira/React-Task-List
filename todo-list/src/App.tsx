import './App.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCheckDouble } from 'react-icons/fa';
import {
  BsPlusLg,
  BsCheckSquareFill,
  BsCheckSquare,
  BsTrashFill
} from 'react-icons/bs';
import { GiNothingToSay } from 'react-icons/gi';
import { SiFitbit } from 'react-icons/si'; 
import { FiEdit } from 'react-icons/fi'; 
import { ITask } from './Interfaces'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'



function App() {

  const [tasks, setTasks] = useState<ITask[]>([]); 
  const [title, setTitle] = useState<string>(''); 
  const [time, setTime] = useState<string>(''); 
  const [isLoading, setIsLoading ] = useState(true); 
  const [open, setOpen ] = useState(false); 


  useEffect(() => {
      axios.get('http://localhost:3001/tasks')
      .then((response) => {
        setIsLoading(true)
        setTasks(response.data.tasks);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setIsLoading(false)
      })

    }, [])
    

    const handleCreate = async ()  => {
      axios.post('http://localhost:3001/tasks/create', { title, time })
    .then((response) => {

      const newTask = {title: title, time: time, done: false}
        setTasks([...tasks, newTask]);

        toast.success('Tarefa Adicionada com sucesso!', { theme: 'colored' });

        setTitle('');
        setTime('');        
  
    })
      .catch((err) => {
        console.error(err)
        toast.error('Ops! Ocorreu um erro...', { theme: 'colored' })
      })
    }


    const handleEdit = async (_id: string, task: ITask): Promise<void>  => {      
        
    const MySwal = withReactContent(Swal)
    setOpen(true)

    const { value: newTitle } = await MySwal.fire({
      customClass: {
        container: 'swal-container',
      },
      input: 'text',
      inputLabel: 'Atualizar Tarefa',
      inputPlaceholder: 'Informe o título alterado da tarefa'
    }) 
    
    const { value: newTime } = await MySwal.fire({
      customClass: {
        container: 'swal-container',
      },
      input: 'text',
      inputLabel: 'Atualizar horário',
      inputPlaceholder: 'Horário...'
    })

    setOpen(false)

      axios.put(`http://localhost:3001/tasks/edit`, {_id, title: newTitle, time: newTime }
    ).then((response) => {         

      setTasks(tasks.map((task: ITask): any => {          
          return  task._id === _id ? { ...task, title: newTitle, time: newTime } : task;          
      }))

      toast.success('Tarefa Atualizada com sucesso!', { theme: 'colored' })

    })
    .catch((err) => {
      console.error(err)
      toast.error('Ops! Ocorreu um erro...', { theme: 'colored' })
    })     
  }


    const handleDelete = async (_id: string): Promise<void> => {
        axios.delete(`http://localhost:3001/tasks/delete/${_id}`)
        .then(() => {

          setTasks(tasks.filter((task: ITask) => {
            return task._id != _id
          }))

          toast.success('Tarefa deletada com sucesso!', { theme: 'colored' });

        })
        .catch((err) => {
          console.error(err)
          toast.error('Ops! Ocorreu um erro...', { theme: 'colored' })
        })
    }


    const handleDone = async (_id: string, task: ITask): Promise<any>  => {      
      
        axios.put(`http://localhost:3001/tasks/status`, {_id, done: true }
      ).then((response) => {         

        setTasks(tasks.map((task: ITask): any => {          
            return  task._id === _id ? { ...task, done: true } : task;          
        }))

        toast.success('Tarefa Realizada! Uhu!', { theme: 'colored' });

      })
      .catch((err) => {
        console.error(err)
        toast.error('Ops! Ocorreu um erro...', { theme: 'colored' })
      })  
          
    }


    const handleClearTasks =  async (): Promise<void> => {
      axios.delete(`http://localhost:3001/tasks/delete-tasks`)
      .then(() => {

        setTasks(tasks.filter((task: ITask) => {
          return task != task 
        }))
        
        toast.success('Lista deletada com sucesso!', { theme: 'colored' });

      })
      .catch((err) => {
        console.error(err)
        toast.error('Ops! Ocorreu um erro...', { theme: 'colored' })
      })
  }
  

  return (
    <div className="App">  
    <div className={open === true ?'swal-bg' : ''}></div> 
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
              <div className={task.done === true ? 'task-done' : ''}>     
                <h4 >
                  <SiFitbit color='#F66B0E' size={14} /> {task.title}</h4>
                <p className={task.done === true ? 'task-done' : ''}>Horário: {task.time}h</p>
              </div>

              <div className="actions">
                <span onClick={() => handleDone(task._id, task)} title="Realizada!">
                  {!task.done ? <BsCheckSquare size={20} /> : <BsCheckSquareFill color='#F66B0E' size={20} /> }
                </span>
                <span onClick={() => handleEdit(task._id, task)} title="Editar">
                  <FiEdit size={20} />
                </span>
                <span onClick={() => handleDelete(task._id)} title="Deletar">
                  <BsTrashFill size={20} />
                </span>
              </div>
            </div>
            )
        })}
      </div>

      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
        
        <div className="clearTasksBtn" >
          <button onClick={() => handleClearTasks()}>LIMPAR LISTA</button>
        </div>         
    </div>
  )
}

export default App;
