//requires

const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');


//middlewares

app.use(cors());
app.use(express.json());


////routes

//create a todo
app.post("/todos",async (req,res) => {
    try {
        const {description} = req.body;
        const newTodo =  await pool.query("INSERT INTO todo (description) VALUES ($1)", [description]);
        res.status(200).json(newTodo.rows[0]);

        
        
    } catch (error) {
        console.error(error.message);
        
    }
})


//get all todos

app.get('/todos' , async (req,res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.status(200).json(allTodos.rows);
        
    } catch (error) {
        console.error(error.message);
        
    }
})


//get one todo

app.get('/todos/:id' , async (req,res) => {
    try {
        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        res.status(200).json(todo.rows[0]);
        
    } catch (error) {
        console.error(error.message);
        
    }
})

//update a todo

app.put('/todos/:id' , async (req,res) => {
    try {
        const {id}  = req.params;
        const {description} = req.body;
        const updatedTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2",[description , id] );

        res.status(200).send(`Todo with id ${id} was updated`);

        
    } catch (error) {
        console.error(error.message);
        
    }
})

//delete a todo


app.delete('/todos/:id' , async (req,res) => {
    try {
        const {id} =  req.params;
        await pool.query("DELETE FROM todo WHERE todo_id=$1",[id]);
        res.status(200).send(`Todo with id ${id} was deleted`);
        
    } catch (error) {
        console.error(error.message);
        
    }
})







app.listen(5000, () => {
    console.log('Server is running on port 5000');
});