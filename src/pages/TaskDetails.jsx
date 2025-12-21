import { useParams } from "react-router-dom"
import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext"

export function TaskDetail() {
    const { id } = useParams()
    const { tasks } = useContext(GlobalContext)

    const task = tasks.find(t => t.id === parseInt(id))

    if(!task){
        return(
            <h2>Task non trovata</h2>
        )
    }

    function handleDelete() {
        console.log("Elimino task")
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