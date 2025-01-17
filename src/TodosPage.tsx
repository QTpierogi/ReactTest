import { useState, useMemo, useCallback, memo } from 'react'
import Modal from './modal/index'

interface ITodoItem {
    id: number
    text: string
}

const initialTodos = [
    { id: 1, text: 'First' },
    { id: 2, text: 'Second' },
    { id: 3, text: 'Third' },
    { id: 4, text: 'Fourth' },
]

const RemovableTodosPage = () => {
    const [isCreateTodoModalOpen, setIsCreateTodoModalOpen] = useState(false)

    const [todoList, setTodoList] = useState<ITodoItem[]>(initialTodos)

    const handleCreateVacation = () => {
        setIsCreateTodoModalOpen(true);
        //setTodoList((prev) => [...prev, { id: prev[prev.length - 1].id + 1, text: taskText }])
    }

    const handleRemoveTodo = useCallback((id: ITodoItem['id']) => {
        setTodoList((prev) => prev.filter((it) => it.id !== id))
    }, [])

    const handleSaveTask = () => {
        setIsCreateTodoModalOpen(false);
        setTodoList((prev) => [...prev, { id: prev[prev.length - 1].id + 1, text: taskText }])
    }

    const [taskText, setText] = useState('')

    const [searchString, setSearchString] = useState('')

    const searchResults = useMemo(() => {
        if (!searchString) return todoList

        return todoList.filter((it) => it.text.includes(searchString))
    }, [todoList, searchString])

    const renderTodo = (item: ITodoItem, _: number) => {
        return <TodoItem onRemove={handleRemoveTodo} item={item} key={item.id} />
    }

    return (
        <div className="wrapper">
            <div className="todoWrapper">
                <h2 style={{ textAlign: 'center' }}>My Todo list:</h2>
                <input
                    className="todoInput"
                    placeholder="Search..."
                    value={searchString}
                    onChange={(ev) => setSearchString(ev.target.value)}
                />
                <ul className="todoListWrapper">{searchResults.map(renderTodo)}</ul>
                <div className="todoCreateWrapper">
                    <button onClick={handleCreateVacation}>+ Item</button>
                    {isCreateTodoModalOpen &&
                        <Modal>
                            <h2>Creating element</h2>
                            <input
                                className="newItemText"
                                placeholder="Add Task..."
                                value={taskText}
                                onChange={(ev) => setText(ev.target.value)}
                            />
                            <button onClick={() => handleSaveTask()}>Save</button>
                            <button onClick={() => setIsCreateTodoModalOpen(false)}>Close</button>
                        </Modal>}
                </div>
            </div>
        </div>
    )
}

interface ITodoItemProps {
  item: ITodoItem
  onRemove: (id: ITodoItem['id']) => void
}
const TodoItem = memo((props: ITodoItemProps) => {
  return (
    <li className="todoItem" key={props.item.id}>
      <p>{props.item.text}</p>
      <button onClick={() => props.onRemove(props.item.id)}>x</button>
    </li>
  )
})

export default RemovableTodosPage