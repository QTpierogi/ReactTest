import { useState, useMemo } from 'react'

interface ITodoItem {
    id: number
    text: string
}

const RemovableTodosPage = () => {
    const [todoList, setTodoList] = useState < ITodoItem[] > ([
        { id: 1, text: 'First' },
        { id: 2, text: 'Second' },
        { id: 3, text: 'Third' },
        { id: 4, text: 'Fourth' },
    ])

    const handleRemoveTodo = (id: ITodoItem['id']) => {
        setTodoList((prev) => prev.filter((it) => it.id !== id))
    }

    const handleCreateVacation = () => {
        setTodoList((prev) => [...prev, { id: prev[prev.length - 1].id + 1, text: taskText }])
    }

    const [taskText, setText] = useState('')

    const [searchString, setSearchString] = useState('')

    const searchResults = useMemo(() => {
        if (!searchString) return todoList

        return todoList.filter((it) => it.text.includes(searchString))
    }, [todoList, searchString])

    const renderTodo = (item: ITodoItem, _: number) => {
        return (
            <li className="todoItem" key={item.id}>
                <p>{item.text}</p>
                <button onClick={() => handleRemoveTodo(item.id)}>x</button>
            </li>
        )
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
                <div className="addItemWithText">
                    <input
                        className="newItemText"
                        placeholder="Add Task..."
                        value={taskText}
                        onChange={(ev) => setText(ev.target.value)}
                    />
                    <button onClick={handleCreateVacation}>+ Item</button>
                </div>
            </div>
        </div>
    )
}

export default RemovableTodosPage