import { useContext, useState } from "react";
import { List, Button, Checkbox, Input, Flex, Dropdown, Col, Row } from "antd";
import { TaskContext, TaskDispatchContext } from "./TasksContext";

const TasksList = () => {
  const tasks = useContext(TaskContext);

  return (
    <List
      style={{ width: 1000 }}
      bordered
      dataSource={tasks}
      renderItem={(task) => (
        <List.Item>
          <TaskItem task={task}></TaskItem>
        </List.Item>
      )}
    />
  );
};

export default TasksList;

const TaskItem = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(task.text);
  const subtasks = task.subtasks || [];
  const taskId = task.id;

  const dispatch = useContext(TaskDispatchContext);

  const confirm = (task) => {
    dispatch({
      type: "deleted",
      id: task.id,
    });
  };

  const items = [
    {
      label: "Delete",
      key: "1",
    },
    {
      label: "Add Subtask",
      key: "2",
    },
  ];

  let pLine = {
    textDecorationLine: "line-through",
  };

  return (
    <Flex gap="middle" justify="flex-start" align="flex-start">
      <Checkbox
        indeterminate={false}
        checked={task.done}
        onChange={() =>
          dispatch({
            type: "toggled",
            id: taskId,
          })
        }
      ></Checkbox>

      <div>
        {isEditing ? (
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onPressEnter={() => {
              dispatch({
                type: "saved",
                task: {
                  ...task,
                  text: text,
                },
              });
              setIsEditing(false);
            }}
            onBlur={() => setIsEditing(false)}
          />
        ) : (
          <div
            onClick={() => setIsEditing(true)}
            style={task.done ? pLine : null}
          >
            {task.text}
          </div>
        )}

        <SubTasks subtasks={subtasks} taskId={taskId} />
      </div>
    </Flex>
  );
};

const SubTasks = ({ subtasks, taskId }) => {
  const CheckboxGroup = Checkbox.Group;
  const dispatch = useContext(TaskDispatchContext);

  const onChange = (subtaskId, taskId) => {
    dispatch({
      type: "subtask_toggled",
      id: subtaskId,
      taskId: taskId,
    });
  };

  return (
    <CheckboxGroup>
      <Row>
        {subtasks.map((subtask) => (
          <Col span={24} key={subtask.id}>
            <Checkbox
              checked={subtask.done}
              value={subtask.text}
              onChange={() => onChange(subtask.id, taskId)}
            >
              {subtask.text}
            </Checkbox>
          </Col>
        ))}
      </Row>
    </CheckboxGroup>
  );
};
