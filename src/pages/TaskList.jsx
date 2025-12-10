import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext"
import { TaskRow } from "../components/taskRow"


export function TaskList() {

    const {tasks} = useContext(GlobalContext)
    console.log(tasks)

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Status</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <TaskRow key={task.id} task={task}/>
                    ))}
                </tbody>
            </table>
        </div>
    )
}