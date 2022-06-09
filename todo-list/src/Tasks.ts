import { useState, useEffect } from 'react';
import axios from 'axios';

const [tasks, setTasks] = useState<Task[]>([]); 
const [title, setTitle] = useState<string>(''); 
const [time, setTime] = useState<string>(''); 
const [isLoading, setIsLoading ] = useState(true) 


useEffect(() => {

    setIsLoading(true)

    axios.get('http://localhost:3001/tasks')
    .then((response) => {
      setTasks(response.data.tasks);

      setIsLoading(false)
    })
    .catch((err) => console.error(err))

  }, [])
  

  const handleCreate = (): void => {
    axios.post('http://localhost:3001/tasks/create',
    {
      title,
      time,
    })
  .then((response) => {
      setTasks([...tasks, {_id: '', title: title, time: time, done: false}])
  })
  .catch((err) => console.error(err))
  }

  const handleEdit = (_id: string): void => {
    const newTitle = prompt('Informe o novo título')
    const newTime = prompt('Informe o novo horário')      

    axios.put('http://localhost:3001/tasks/edit', { newTitle: newTitle, newTime: newTime 
    }).then(() => {
      setTasks(tasks.map((el: any) => {
        return el._id == _id ? { _id: '', title: newTitle, time: newTime } : el
      }))
    }).catch((err) => console.error(err))
    
  }

  const handleDelete = (_id: string) => {
      axios.delete(`http://localhost:3001/tasks/delete/${_id}`)
      .then(() => {
        setTasks(tasks.filter((el) => {
          return el._id != _id;
        }))

      })
  }

  const handleDone = (task: Task) => {
    task.done = !task.done;      

    setTasks(tasks);
  }


// export default Tasks;
