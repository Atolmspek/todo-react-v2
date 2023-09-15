import React, { useState, useEffect } from "react";
import Todo from "./components/Todo";
import Form from "./components/Form";
import { nanoid } from "nanoid";
import { ChakraProvider } from "@chakra-ui/react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

export default function App(props) {
  // Obtener tareas guardadas en el localStorage al cargar la aplicación
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const [tasks, setTasks] = useState(savedTasks);

  // Guardar tareas en el localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(name) {
    const newTask = { id: nanoid(), name, completed: false };
    setTasks([...tasks, newTask]);
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  const taskList = tasks.map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  return (
    <ChakraProvider>
      <Flex
        direction="column"
        align="center"
        justify="center"
        minH="100vh"
        bg="gray.100"
      >
        <Box
          className="todoapp"
          p={5}
          textAlign="center"
          bg="white"
          rounded="lg"
          shadow="md"
        >
          <Heading as="h1" mb={4} fontSize="2xl" color="blue.500">
            Todo
          </Heading>
          <Form addTask={addTask} />
          <Flex
            className="filters btn-group stack-exception"
            display="flex"
            justifyContent="center"
            mb={4}
          >
           
          </Flex>
          <Heading as="h2" id="list-heading" mt={4} mb={2} fontSize="xl">
            {headingText}
          </Heading>
          <Box
            as="ul"
            role="list"
            className="todo-list stack-large stack-exception"
            aria-labelledby="list-heading"
            mt={2}
          >
            {taskList}
          </Box>
          <Text mt={4} fontSize="sm" color="gray.600">
            Designed using Chakra UI
          </Text>
        </Box>
      </Flex>
    </ChakraProvider>
  );
}