import React, { useState, useEffect } from "react";
import "./App.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button, ListGroup, Badge } from 'react-bootstrap';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add new task
  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  // Delete task
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Mark task as complete/incomplete
  const handleToggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Edit task
  const handleEditTask = (id, text) => {
    setEditingTaskId(id);
    setEditingText(text);
  };

  const handleSaveEdit = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: editingText } : task
      )
    );
    setEditingTaskId(null);
    setEditingText("");
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h1 className="text-center mb-4">To-Do Application</h1>
          
          <Form className="mb-4">
            <Row>
              <Col>
                <Form.Control
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Add a new task..."
                />
              </Col>
              <Col xs="auto">
                <Button variant="primary" onClick={handleAddTask}>Add</Button>
              </Col>
            </Row>
          </Form>

          <div className="text-center mb-4">
            <Badge bg="primary" className="me-2">Total Tasks: {totalTasks}</Badge>
            <Badge bg="success">Completed Tasks: {completedTasks}</Badge>
          </div>

          <ListGroup>
            {tasks.map((task) => (
              <ListGroup.Item 
                key={task.id}
                className={`d-flex justify-content-between align-items-center ${task.completed ? 'bg-light' : '' } `}
                // className={d-flex justify-content-between align-items-center ${task.completed ? 'bg-light' : ''}}
              >
                {editingTaskId === task.id ? (
                  <>
                    <Form.Control
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      className="me-2"
                    />
                    <Button variant="success" size="sm" onClick={() => handleSaveEdit(task.id)}>
                      Save
                    </Button>
                  </>
                ) : (
                  <>
                    <span 
                      onClick={() => handleToggleComplete(task.id)}
                      style={{ 
                        textDecoration: task.completed ? 'line-through' : 'none',
                        cursor: 'pointer'
                      }}
                    >
                      {task.text}
                    </span>
                    <div>
                      <Button 
                        variant="warning" 
                        size="sm" 
                        className="me-2"
                        onClick={() => handleEditTask(task.id, task.text)}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="danger" 
                        size="sm"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </>
                )}
              </ListGroup.Item>
              
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default App;