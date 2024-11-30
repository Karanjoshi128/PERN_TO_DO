//imports

import { useEffect, useState } from "react";
import axios from 'axios';
import Li from "./Li";



//axios 
axios.defaults.baseURL = 'http://localhost:5000';



export default function Widget() {



    const [description, setDescription] = useState("");
    const [dataArray, setDataArray] = useState([]);

    const handleAddClick = async () => {
        try {
            const response = await axios.post('/todos', { description });
            console.log(response); // Logs the response from the API
            setDescription("");
            fetchData();
        } catch (error) {
            console.error(error); // Logs the error if the request fails
        }
    };

    //get all todos

    const fetchData = async () => {
        try {
            const response = await axios.get("/todos");
            setDataArray(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    //edit a todo

    const handleEditTodo = async (id) => {
        try {
            await axios.put(`/todos/${id}`, { description });
            setDescription("");

            fetchData();

        } catch (error) {
            console.error(error);

        }
    }

    //delete a todo

    const handleDeleteTodo = async (id) => {
        try {
            await axios.delete(`/todos/${id}`);
            fetchData();

        } catch (error) {
            console.error(error);

        }
    }


    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleAddClick(); // Trigger the submit function when Enter is pressed
        }
    };


    useEffect(() => {
        fetchData();

    }, []);




    return (


        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground ">
            <div className="border-2 border-black rounded-lg w-[35rem] h-auto p-9 flex flex-col justify-center items-center">
                <h1 className="text-3xl font-bold mb-4">My Todo List</h1>
                <div className="w-full max-w-md">
                    <div className="flex items-center border-b border-border py-2">
                        <input type="text" placeholder="Add a new todo" value={description} onChange={(e) => setDescription(e.target.value)} onKeyDown={handleKeyDown} className="w-full px-2 py-1 mr-2 bg-input text-foreground placeholder-foreground border-none focus:outline-none" />
                        <button className="bg-primary text-primary-foreground px-4 py-1 rounded-lg hover:bg-primary/80 border-black border-2" onClick={handleAddClick}>Add</button>
                    </div>
                    <ul className="mt-4">
                        {dataArray.map((todo) => {
                            return <Li key={todo.todo_id} id={todo.todo_id} description={todo.description} handleEditTodo={handleEditTodo} handleDeleteTodo={handleDeleteTodo} />

                        })}
                    </ul>
                </div>
            </div>
        </div>


    )
}