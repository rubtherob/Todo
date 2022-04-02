import React from 'react'
import {Link} from "react-router-dom";

const TodoListItem = ({item, deleteTodos}) => {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.text}</td>
            <td>{item.create}</td>
            <td>{item.project}</td>
            <td>{item.user}</td>
            <td><button onClick={()=>deleteTodos(item.id)} type='button'>Delete</button></td>
        </tr>
    )
}

const TodoList = ({items, deleteTodos}) => {
    return (
        <div>
            <table className="table">
                <tr>
                    <th>Id</th>
                    <th>Text</th>
                    <th>Create</th>
                    <th>Project</th>
                    <th>Creator</th>
                    <th></th>
                </tr>
                {items.map((item) => <TodoListItem item={item} deleteTodos={deleteTodos}/>)}
            </table>
            <Link to='/todos/create'>Create</Link>
        </div>
    )
}

export default TodoList