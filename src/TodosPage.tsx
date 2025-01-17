import { useState, useMemo, useCallback, memo } from 'react'
import Modal from './modal/index'
import useDebounce from './useDebounce'

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

const TodosPage = () => {
    const TodoItem = memo((props: ITodoItemProps) => {
        return (
            <li className="todoItem" key={props.item.id}>
                <p>{props.item.text}</p>
                <div className="buttons">
                    <button onClick={() => openEditWindow(props.item.id)}>edit</button>
                    <button onClick={() => props.onRemove(props.item.id)}>x</button>
                </div>
            </li>
        )
    })

    const [isCreateTodoModalOpen, setIsCreateTodoModalOpen] = useState(false)
    const [isEditTodoModalOpen, setIsEditTodoModalOpen] = useState(false)
    const [currentId, setCurrentId] = useState(-1)

    const [todoList, setTodoList] = useState<ITodoItem[]>(initialTodos)

    const handleCreateVacation = () => {
        setIsCreateTodoModalOpen(true);
    }

    const handleRemoveTodo = useCallback((id: ITodoItem['id']) => {
        setTodoList((prev) => prev.filter((it) => it.id !== id))
    }, [])

    const handleSaveTask = () => {
        setIsCreateTodoModalOpen(false);
        setTodoList((prev) => [...prev, { id: prev[prev.length - 1].id + 1, text: taskText }]);
        setText('');
    }

    const openEditWindow = (targetId) => {
        const item = todoList.find((it) => it.id == targetId);
        setCurrentId(targetId);
        setText(item.text);
        setIsEditTodoModalOpen(true);
    }

    const saveEditedTask = () => {
        setIsEditTodoModalOpen(false);
        const item = todoList.find((it) => it.id == currentId);
        item.text = taskText;
        setText('');
    }

    const [taskText, setText] = useState('')

    const [searchString, setSearchString] = useState('')
    const debouncedSearch = useDebounce(searchString, 500);

    const searchResults = useMemo(() => {
        if (!searchString) return todoList

        return todoList.filter((it) => it.text.includes(searchString))
    }, [todoList, debouncedSearch])

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
                <div className="todoEditWrapper">
                    {isEditTodoModalOpen &&
                        <Modal>
                            <h2>Editing element</h2>
                            <input
                                className="changingItemText"
                                placeholder="Add Task..."
                                value={taskText}
                                onChange={(ev) => setText(ev.target.value)}
                            />
                            <button onClick={() => saveEditedTask()}>Save</button>
                            <button onClick={() => setIsEditTodoModalOpen(false)}>Close</button>
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

export default TodosPage