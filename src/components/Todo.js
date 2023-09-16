import React, { useState } from "react";
import {
  Input,
  Box,
  Flex,
  Button,
  Text,
  FormControl,
} from "@chakra-ui/react";

function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState(props.name);
  const [taskStatus, setTaskStatus] = useState(props.status);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancelClick = () => {
    setEditing(false);
    setNewName(props.name);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleSaveClick = () => {
    props.editTask(props.id, newName);
    setEditing(false);
  };

  const handleStatusChange = () => {
    if (taskStatus === "Todo") {
      setTaskStatus("In Progress");
    } else if (taskStatus === "In Progress") {
      setTaskStatus("Completed");
    } else {
      setTaskStatus("Todo");
    }
  };

  const getStatusColor = () => {
    if (taskStatus === "Todo") {
      return "gray";
    } else if (taskStatus === "In Progress") {
      return "yellow";
    } else {
      return "green";
    }
  };


  const viewTemplate = (
    <Flex alignItems="center" justifyContent="space-between">
   
        <Text textDecoration>
          {props.name}
        </Text>
    
      <Flex>
      <Button  colorScheme={getStatusColor()}
        onClick={handleStatusChange} size="sm" marginRight={2}>{taskStatus}</Button>

        <Button colorScheme="teal" size="sm" onClick={handleEditClick}>
          Edit
        </Button>
        <Button
          colorScheme="red"
          size="sm"
          marginLeft={2}
          onClick={() => props.deleteTask(props.id)}
        >
          Delete
        </Button>
      </Flex>
    </Flex>
  );

  const editingTemplate = (
    <FormControl>
      <Input
        type="text"
        value={newName}
        onChange={handleNameChange}
        autoFocus
      />
      <Flex>
        <Button colorScheme="teal" size="sm" onClick={handleSaveClick}>
          Save
        </Button>
        <Button colorScheme="red" size="sm" onClick={handleCancelClick}>
          Cancel
        </Button>
      </Flex>
    </FormControl>
  );

  return (
    <Box p={2} border="1px solid #ccc" borderRadius="md" mb={2}>
      {isEditing ? editingTemplate : viewTemplate}
    </Box>
  );
}

export default Todo;