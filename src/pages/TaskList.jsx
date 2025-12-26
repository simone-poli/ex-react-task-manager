import { useContext, useMemo, useState } from "react"
import { GlobalContext } from "../context/GlobalContext"
import { TaskRow } from "../components/taskRow"


export function TaskList() {

    const { tasks } = useContext(GlobalContext)
    console.log(tasks)

    const [sortBy, setSortBy] = useState('createdAt')
    const [sortOrder, setSortOrder] = useState(1)



    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(prev => prev * -1)
        } else {
            setSortBy(field)
            setSortOrder(1)
        }
    }

    const sortedTask = useMemo(() => {
        return [...tasks].sort((a, b) => {
            let comparison;

            if (sortBy === 'title') {
                comparison = a.title.localeCompare(b.title)
            } else if (sortBy === 'status') {
                const statusOption = ["To Do", "Doing", "Done"]
                comparison = statusOption.indexOf(a.status) - statusOption.indexOf(b.status)
            } else if (sortBy === 'createdAt') {
                const dateA = new Date(a.createdAt).getTime()
                const dateB = new Date(b.createdAt).getTime()
                comparison = dateA - dateB;
            }

            return comparison * sortOrder;
        })
    }, [tasks, sortBy, sortOrder])

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => handleSort('title')}>
                            Nome {sortBy === 'title'}
                        </th>
                        <th onClick={() => handleSort('status')}>
                            Status {sortBy === 'status'}
                        </th>
                        <th onClick={() => handleSort('createdAt')}>
                            Data {sortBy === 'createdAt'}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedTask.map(task => (
                        <TaskRow key={task.id} task={task} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}