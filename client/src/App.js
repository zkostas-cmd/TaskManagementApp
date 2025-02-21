import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Button,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      setTasks(response.data);
    } catch (error) {
      showSnackbar('Error fetching tasks', 'error');
    }
  };

  const handleAddTask = async () => {
    try {
      const response = await axios.post(`${API_URL}/tasks`, {
        description,
        date: {
          day: selectedDate.getDate(),
          month: selectedDate.getMonth() + 1,
          year: selectedDate.getFullYear()
        }
      });
      setTasks([response.data, ...tasks]);
      setDescription('');
      setSelectedDate(new Date());
      setOpenDialog(false);
      showSnackbar('Task added successfully');
    } catch (error) {
      showSnackbar('Error adding task', 'error');
    }
  };

  const handleToggleComplete = async (taskId) => {
    try {
      const response = await axios.patch(`${API_URL}/tasks/${taskId}`);
      setTasks(tasks.map(task => 
        task._id === taskId ? response.data : task
      ));
      showSnackbar('Task updated successfully');
    } catch (error) {
      showSnackbar('Error updating task', 'error');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`${API_URL}/tasks/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId));
      showSnackbar('Task deleted successfully');
    } catch (error) {
      showSnackbar('Error deleting task', 'error');
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" component="h1">
            Task Manager
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
          >
            Add Task
          </Button>
        </Box>

        <Paper elevation={2}>
          <List>
            {tasks.map((task) => (
              <ListItem
                key={task._id}
                sx={{
                  borderBottom: '1px solid #eee',
                  '&:last-child': { borderBottom: 'none' }
                }}
              >
                <Checkbox
                  checked={task.completed}
                  onChange={() => handleToggleComplete(task._id)}
                />
                <ListItemText
                  primary={task.description}
                  secondary={`Due: ${task.date.day}/${task.date.month}/${task.date.year}`}
                  sx={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                    color: task.completed ? 'text.secondary' : 'text.primary'
                  }}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={() => handleDeleteTask(task._id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
            {tasks.length === 0 && (
              <ListItem>
                <ListItemText
                  primary="No tasks available"
                  sx={{ textAlign: 'center', color: 'text.secondary' }}
                />
              </ListItem>
            )}
          </List>
        </Paper>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Task Description"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ mb: 2 }}
            />
            <DatePicker
              label="Due Date"
              value={selectedDate}
              onChange={setSelectedDate}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button
              onClick={handleAddTask}
              variant="contained"
              disabled={!description.trim()}
            >
              Add Task
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </LocalizationProvider>
  );
}

export default App;