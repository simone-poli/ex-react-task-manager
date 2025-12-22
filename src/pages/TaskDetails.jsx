import { useParams, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext"

export function TaskDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { tasks, removeTask } = useContext(GlobalContext)

    const task = tasks.find(t => t.id === parseInt(id))

    if(!task){
        return(
            <h2>Task non trovata</h2>
        )
    }

   const handleDelete = async () => {
        try{
            await removeTask(task.id);
            alert("Task eliminata")
            navigate('/')

        } catch(error){
            console.log(error)
            alert(error.message)
        }
    }

    return(
        <>
        <div className="taskD">
            <h1>Dettaglio task</h1>
            <p>Nome: {task.title}</p>
            <p>Descrizione: {task.description}</p>
            <p>Stato: {task.state}</p>
            <p>Data di creazione: {new Date(task.createdAt).toLocaleDateString()}</p>
            <button onClick={handleDelete}>Elimina task</button>
        </div>
        </>
    )

    
}