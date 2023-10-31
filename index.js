const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const yup = require('yup');


// Initialize Sequelize
const sequelize =new Sequelize('postgres://username:password@localhost:port_number/database');


const app =express();
const port = 8000;

// Define a schema for validating for requests
const todoSchema = yup.object().shape({
    text: yup.string().required(),
    isCompleted: yup.boolean(), 
  });
  

// Define the "todos" model
const Todo = sequelize.define('todos', {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },{
    timestamps: false, 
  });
  
  (async()=>{
    try{
        await sequelize.sync();
        console.log('Database synchronized successfully.');
    }
    catch(error){
        console.error('Error synchronizing the database:',error);
    }
  })();



app.use(bodyParser.json());

// Get all todos
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.status(200).json(todos);
  } catch (err) {
    console.error('Error:', err);
    res.status(404).send('Not Found');
  }
});

// Get a specific todo by ID
app.get('/todos/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const todo = await Todo.findByPk(id);
    if (!todo) {
      res.status(404).send('Id not found');
    } else {
      res.status(200).json(todo);
    }
  } catch (err) {
    console.error('Error:', err);
    res.status(404).send('Id not found');
  }
});

// Add a new todo
app.post('/todos', async (req, res) => {
  const { text, isCompleted } = req.body;
  try {
    await todoSchema.validate({ text, isCompleted });
    const todo = await Todo.create({ text, isCompleted });
    res.status(200).json(todo);
  } catch (err) {
    console.error('Error:', err);
    res.status(400).send('Bad Request');
  }
});

// Update a todo by ID
app.put('/todos/:id', async (req, res) => {
  const id = req.params.id;
  const { text, isCompleted } = req.body;
  try {
    await todoSchema.validate({ text, isCompleted });
    const [updatedRows] = await Todo.update({ text, isCompleted }, { where: { id } });
    if (updatedRows === 0) {
      res.status(404).send('Id not found');
    } else {
      const updatedTodo = await Todo.findByPk(id);
      res.status(200).json(updatedTodo);
    }
  } catch (err) {
    console.error('Error:', err);
    res.status(400).send('Bad Request');
  }
});

// Delete a todo by ID
app.delete('/todos/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const todo = await Todo.findByPk(id);
    if (!todo) {
      res.status(404).send('Id not found');
    } else {
      await Todo.destroy({ where: { id } });
      res.status(200).json(todo);
    }
  } catch (err) {
    console.error('Error:', err);
    res.status(400).send('Bad Request');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
