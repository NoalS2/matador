import { useEffect, useState } from 'react/cjs/react.production.min';

export const Tasks = ({ tasks, users, ...other }) => {
  const [checkedState, setCheckedState] = useState([]);

  useEffect(async () => {
    setCheckedState(tasks.map((task) => task.status));
  });

  handleOnChange = (i) => {
    const updatedCheckedState = checkedState.map((item, index) => (index === i ? !item : item));
    setCheckedState(updatedCheckedState);
  };

  return (
    <div className="flex-1">
      {tasks.map((task, i) => {
        return (
          <div key={task.id} className="flex" {...other}>
            <div className="m-1 p-2 content-end align-middle">
              <input
                type="checkbox"
                className="content-center align-middle"
                checked={checkedState[i]}
                onChange={() => handleOnChange(i)}
              />
            </div>
            <div className="m-1 content-center">{task.title}</div>
            <div className="m-1">{task.description}</div>
            <div className="m-1">{task.timeEstimate}</div>
            <div className="m-1">
              {users.find((user) => user.id === task.userId).firstName +
                ' ' +
                users.find((user) => user.id === task.userId).lastName}
            </div>
          </div>
        );
      })}
    </div>
  );
};
