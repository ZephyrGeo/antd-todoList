import { TaskProvider } from "./TasksContext";
import TasksList from "./TasksList";
import AddTask from "./AddTask";
// import "./app.css";
import { Flex } from "antd";

function App() {
  return (
    <Flex gap="middle" align="center" vertical>
      <TaskProvider>
        <AddTask />
        <TasksList />
      </TaskProvider>
    </Flex>
  );
}

export default App;
