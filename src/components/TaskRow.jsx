import {memo} from "react"
import { Link } from "react-router-dom"


function TaskR ({task}) {

    const statusClassName = task.status.replace(" ","").toLowerCase()


    return (
        <tr>
            <td><Link to={`/tasks/${task.id}`}>{task.title}</Link></td>
            <td className={statusClassName}>{task.status}</td>
            <td>{new Date(task.createdAt).toLocaleDateString()}</td>
        </tr>
    )

}



export const TaskRow = memo(TaskR)