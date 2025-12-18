import { useState, useRef, useMemo } from 'react'

const symbols = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";


export function AddTask() {

    const [taskTitle, setTaskTitle] = useState("")
    const descriptionRef = useRef()
    const statusRef = useRef()

    const taskTitleError = useMemo(() => {
        if (!taskTitle.trim())
            return "Il nome della task non può essere vuoto"
        if ([...taskTitle].some(char => symbols.includes(char)))
            return "Il nome della task non può contenere simboli"
        return ""
    }, [taskTitle])

    const handleSubmit = event => {
        event.preventDefault()
        if (taskTitleError)
            return;

        const newTask = {
            title: taskTitle.trim(),
            description: descriptionRef.current.value,
            status: statusRef.current.value,
        }
        console.log(newTask)
    }



    return (
        <div>
            <h1>Inserisci nuova task</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Nome Task:
                    <input
                        type="text"
                        value={taskTitle}
                        onChange={e => setTaskTitle(e.target.value)}
                    />
                </label>
                {taskTitleError &&
                    <p style={{ color: 'red' }}>{taskTitleError}</p>
                }
                <label>
                    Descrizione:
                    <textarea ref={descriptionRef} />
                </label>

                <label>
                    Stato:
                    <select ref={statusRef} defaultValue="To do">
                        {["To Do", "Doing", "Done"].map((value, index) => (
                            <option key={index} value={value}> {value}</option>
                        ))}
                    </select>
                </label>

                <button type="submit" disabled={taskTitleError}>Aggiungi task</button>
            </form>
        </div>
    )

}