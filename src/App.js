// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  Box,
  Grid,
  Chip,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [editId, setEditId] = useState(null);

  const addTodo = () => {
    if (input.trim()) {
      if (editId !== null) {
        setTodos(todos.map(todo => 
          todo.id === editId ? { ...todo, text: input } : todo
        ));
        setEditId(null);
      } else {
        setTodos([...todos, {
          id: Date.now(),
          text: input,
          completed: false
        }]);
      }
      setInput('');
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const editTodo = (todo) => {
    setInput(todo.text);
    setEditId(todo.id);
  };

  const stats = {
    total: todos.length,
    completed: todos.filter(todo => todo.completed).length,
    pending: todos.filter(todo => !todo.completed).length
  };

  return (
    <Container maxWidth="md" className="app-container">
      <Paper elevation={3} className="todo-paper">
        <Typography variant="h4" align="center" gutterBottom color="primary">
          Todo List
        </Typography>

        <Box className="stats-container">
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Chip label={`Total: ${stats.total}`} color="primary" />
            </Grid>
            <Grid item>
              <Chip label={`Completed: ${stats.completed}`} color="success" />
            </Grid>
            <Grid item>
              <Chip label={`Pending: ${stats.pending}`} color="warning" />
            </Grid>
          </Grid>
        </Box>

        <Box className="input-container">
          <TextField
            fullWidth
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task"
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={addTodo}
            className="add-button"
          >
            {editId !== null ? 'Update' : 'Add Task'}
          </Button>
        </Box>

        <List className="todo-list">
          {todos.map((todo) => (
            <ListItem
              key={todo.id}
              className={`todo-item ${todo.completed ? 'completed' : ''}`}
            >
              <Checkbox
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                color="primary"
              />
              <ListItemText primary={todo.text} />
              <IconButton onClick={() => editTodo(todo)} color="primary">
                <Edit />
              </IconButton>
              <IconButton onClick={() => deleteTodo(todo.id)} color="error">
                <Delete />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default App;
