import { useCallback, useContext, useMemo, useState } from "react"
import { GlobalContext } from "../context/GlobalContext"
import { TaskRow } from "../components/taskRow"


function debounce(callback, delay){
    let timer;
    return(value) =>  {
        clearTimeout(timer)
        timer = setTimeout(() => {
            callback(value)
        }, delay)
    }

}


export function TaskList() {

    const { tasks } = useContext(GlobalContext)
    console.log(tasks)

    const [sortBy, setSortBy] = useState('createdAt')
    const [sortOrder, setSortOrder] = useState(1)
    const [searchQuery, setSearchQuery] = useState("")
    const debounceSearch = useCallback(debounce(setSearchQuery, 500), [])



    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(prev => prev * -1)
        } else {
            setSortBy(field)
            setSortOrder(1)
        }
    }

    const filteredAndSortedTask = useMemo(() => {
        return [...tasks]
        .filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => {
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
    }, [tasks, sortBy, sortOrder, searchQuery])

    return (
        <div>
           <input 
           type="text" 
           placeholder="cerca task..."
           onChange={e => debounceSearch(e.target.value)}
           />
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
                    {filteredAndSortedTask.map(task => (
                        <TaskRow key={task.id} task={task} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}