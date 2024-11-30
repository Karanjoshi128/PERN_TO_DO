import React, { useState } from 'react'
import edit from '../assets/images/edit.png'

const Li = (props) => {

    const [linethrough, setLinethrough] = useState();

    const handleLineThrough = () => {
        if (linethrough === "line-through") {
            setLinethrough("");
        } else {
            setLinethrough("line-through");
        }
    }

    const handleEdit = () => {
        // Call handleEditTodo with id and newDescription
        props.handleEditTodo(props.id);
    };


    const handleDelete = () => {
        // Call handleEditTodo with id and newDescription
        props.handleDeleteTodo(props.id);
    };


    return (
        <>
            <li className="flex items-center justify-between py-2 border-b border-border">
                <span className="flex items-center">
                    <input type="checkbox" className="form-checkbox h-5 w-5 text-primary border border-border mr-2" onClick={handleLineThrough} />
                    <span className={`text-lg ${linethrough}`}>{props.description}</span>
                </span>
                <button onClick={handleEdit}><img src={edit} alt="Edit" className='w-[15px]' /></button>
                <button onClick={handleDelete} className="text-destructive hover:text-destructive/80 border-2 border-black rounded-lg p-1">Delete</button>
            </li>

        </>
    )
}

export default Li;
