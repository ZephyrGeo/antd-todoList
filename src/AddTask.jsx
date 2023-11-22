import { useContext, useState } from "react";
import { TaskDispatchContext } from "./TasksContext";

import { Input, Button, Flex } from "antd";

const AddTask = () => {
  const [text, setText] = useState();
  const dispatch = useContext(TaskDispatchContext);
  const handleAdd = () => {
    if (!text) return;
    dispatch({
      type: "added",
      id: nextId++,
      text: text,
    });
  };
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleAdd();
      setText("");
    }
  };

  let canAddTask;
  if (text) {
    canAddTask = (
      <Button onClick={handleAdd} size="large">
        Add
      </Button>
    );
  } else {
    canAddTask = (
      <Button disabled size="large">
        Add
      </Button>
    );
  }
  return (
    <Flex gap="middle" align="center" style={{ width: 1000 }}>
      <Input
        placeholder="Add your task"
        size="large"
        allowClear
        value={text}
        onChange={handleChange}
        onPressEnter={handleEnter}
      />
      {canAddTask}
    </Flex>
  );
};

export default AddTask;

let nextId = 6;
