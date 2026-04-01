import {useState} from 'react';
import TaskInput from './components/TaskInput';
import TaskItem from './components/TaskItem';

function App() {
  const [toDoList, setToDoList]=useState([]);

  const addTask = (taskName) =>{
    const newTask = {taskName, checked: false};
    setToDoList([...toDoList, newTask]);
  };

  function deletTask(deletTaskName){
    setToDoList(toDoList.filter(task=>task.
    taskName !== deletTaskName));

  }

  function toggleCheck (taskName){
    setToDoList((prevToDoList) => 
      prevToDoList.map(task => 
        task.taskName===taskName? {...task,
        checked: !task.checked}:task,
      ),
    );
  }

  

  return ( 
    <>
      <div className="container">
        <h1>Task Master</h1>
        <p>{import.meta.env.VITE_APP_STATUS}</p>

        <TaskInput addTask={addTask}/>

        <div className="toDoList">
          <span>To do</span>
          <ul className="list-items">
            {toDoList.map((task, key)=> (
              <TaskItem 
                task ={task} 
                key={key}
                deletTask={deletTask} 
                toggleCheck={toggleCheck}
              />
            ))}

          </ul>

          {toDoList.length ===0?(
            <p className="notify">You are done!</p>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default App;
