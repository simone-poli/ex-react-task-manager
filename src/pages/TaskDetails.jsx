import { useParams, useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { GlobalContext } from "../context/GlobalContext"
import {Modal} from "../components/Modal"
import EditTaskModal from "../components/EditTaskModal"

export function TaskDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { tasks, removeTask, updateTask } = useContext(GlobalContext)

    const task = tasks.find(t => t.id === parseInt(id))

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)

    if (!task) {
        return (
            <h2>Task non trovata</h2>
        )
    }

    const handleDelete = async () => {
        try {
            await removeTask(task.id);
            alert("Task eliminata")
            navigate('/')

        } catch (error) {
            console.log(error)
            alert(error.message)
        }
    }

        const handleUpdate = async updatedTask => {
            try{
                await updateTask(updatedTask)
                setShowDeleteModal(false)
            } catch(error) {
                console.log(error);
                alert(error.message);
            }
        }


    return (
        <>
            <div className="taskD">
                <h1>Dettaglio task</h1>
                <p>Nome: {task.title}</p>
                <p>Descrizione: {task.description}</p>
                <p>Stato: {task.state}</p>
                <p>Data di creazione: {new Date(task.createdAt).toLocaleDateString()}</p>
                <button onClick={() => setShowDeleteModal(true)}>Elimina task</button>
                <button onClick={() => setShowEditModal(true)}>Modifica task</button>
                
                
                <Modal
                    title="Conferma eliminazione"
                    content={<p>Sei sicuro dell'eliminazione?</p>}
                    show={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={handleDelete}
                    confirmText="Elimina"
                />
                
                <EditTaskModal
                    task = {task}
                    show = {showEditModal}
                    onClose = {() => setShowEditModal(false)}
                    onSave = {handleUpdate}
                />
            </div>
        </>
    )


}