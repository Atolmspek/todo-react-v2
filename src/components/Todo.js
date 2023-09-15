import React, { useState } from "react";
import {
  Checkbox,
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

  const viewTemplate = (
    <Flex alignItems="center" justifyContent="space-between">
      <Checkbox
        isChecked={props.completed}
        onChange={() => props.toggleTaskCompleted(props.id)}
      >
        <Text textDecoration={props.completed ? "line-through" : "none"}>
          {props.name}
        </Text>
      </Checkbox>
      <Flex>
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