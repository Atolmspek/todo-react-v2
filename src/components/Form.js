import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";

function Form(props) {
  const [name, setName] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addTask(name);
    setName("");
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel htmlFor="new-todo-input">What needs to be done?</FormLabel>
        <Input
          type="text"
          id="new-todo-input"
          name="text"
          autoComplete="off"
          value={name}
          onChange={handleChange}
        />
      </FormControl>
      <Button type="submit" colorScheme="teal" size="lg" mt={2}>
        Add
      </Button>
    </Box>
  );
}

export default Form;
