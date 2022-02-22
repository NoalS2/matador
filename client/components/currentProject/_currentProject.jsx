import { useContext, useEffect, useState } from 'react';
import { ApiContext } from '../../utils/api_context';
import { useParams } from 'react-router-dom';
import { Button } from '../common/button';
import { Input } from '../common/input';

export const CurrentProject = () => {
  const api = useContext(ApiContext);
  const [userProject, setUserProject] = useState(null);
  const [user, setUser] = useState(null);
  const [newUser, setNewUser] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newTimeEstimate, setNewTimeEstimate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [project, setProject] = useState(null);
  const { projectId } = useParams('projectId');
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [checkedState, setCheckedState] = useState([]);

  useEffect(async () => {
    const res = await api.get('/users/me');
    setUser(res.user);

    const currentProject = await api.get('/project/' + projectId);
    setProject(currentProject);
    setUsers(currentProject.userProjects.map((userProject) => userProject.user));

    setUserProject(currentProject.userProjects.find((userProject) => userProject.userId === res.user.id));

    const currentTasks = await api.get('/tasks/' + projectId);
    setTasks(currentTasks);

    setCheckedState(currentTasks.map((task) => task.status));

    setLoading(false);
  }, []);

  addUser = async () => {
    setErrorMessage('');
    if (newUser === '') {
      setErrorMessage('No user was provided.');
      return;
    }
    try {
      const { user } = await api.post('/project/' + projectId, { email: newUser });
      setUsers([...users, user]);
    } catch (error) {
      setErrorMessage('Unable to add user, please ensure the email is correct.');
    }
  };

  addTask = async () => {
    setErrorMessage('');
    if (newTitle === '' || newDescription === '' || newTimeEstimate == '') {
      setErrorMessage('A Field was left blank.');
      return;
    }

    if (userProject.leader) {
      const { task } = await api.post('/task', {
        title: newTitle,
        description: newDescription,
        timeEstimate: newTimeEstimate,
        userId: document.getElementById('userAssigned').value,
        projectId: project.id,
      });
      setTasks([...tasks, task]);
    } else {
      const { task } = await api.post('/task', {
        title: newTitle,
        description: newDescription,
        timeEstimate: newTimeEstimate,
        userId: user.id,
        projectId: project.id,
      });
      setTasks([...tasks, task]);
    }
  };

  console.log(user);

  if (loading) {
    return <div>Loading...</div>;
  }

  handleOnChange = async (i, id) => {
    const res = await api.post('/tasks/' + id.toString());
    console.log(res);

    const updatedCheckedState = checkedState.map((item, index) => (index === i ? !item : item));
    setCheckedState(updatedCheckedState);
  };

  return (
    <>
      <h1>{project.title}</h1>
      {userProject.leader && (
        <div>
          <Input type="email" id="newUser" value={newUser} onChange={(e) => setNewUser(e.target.value)} />
          <Button type="button" onClick={addUser}>
            Add User
          </Button>
          <div className="text-red-600">{errorMessage}</div>
        </div>
      )}
      <div>
        <h2>Create a new task</h2>
        <h3>Title</h3>
        <Input type="title" id="newTitle" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
        <h3>Description</h3>
        <Input
          type="description"
          id="newDecription"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <h3>Time Estimate</h3>
        <Input
          type="title"
          id="newTimeEstimate"
          value={newTimeEstimate}
          onChange={(e) => setNewTimeEstimate(e.target.value)}
        />
        {userProject.leader && (
          <>
            <h3>Assign to</h3>
            <select name="userAssigned" id="userAssigned">
              {users.map((user) => {
                return (
                  <option key={user.id} value={user.id}>
                    {user.firstName + ' ' + user.lastName}
                  </option>
                );
              })}
            </select>
          </>
        )}
        <Button type="button" onClick={addTask}>
          Add Task
        </Button>
      </div>
      <div>
        <h1>Tasks</h1>
        {userProject.leader && (
          <div className="flex-1">
            {tasks.map((task, i) => {
              return (
                <div key={task.id} className="flex">
                  <div className="m-1 p-2 content-end align-middle">
                    <input
                      type="checkbox"
                      className="content-center align-middle"
                      checked={checkedState[i]}
                      onChange={() => handleOnChange(i, task.id)}
                    />
                  </div>
                  <div className="m-1 content-center">{task.title}</div>
                  <div className="m-1">{task.description}</div>
                  <div className="m-1">{task.timeEstimate}</div>
                </div>
              );
            })}
          </div>
        )}
        {!userProject.leader && (
          <div className="flex-1">
            {tasks.map((task, i) => {
              return (
                <div key={task.id}>
                  {user.id === task.userId && (
                    <div className="flex">
                      <div className="m-1 p-2 content-end align-middle">
                        <input
                          type="checkbox"
                          className="content-center align-middle"
                          checked={checkedState[i]}
                          onChange={() => handleOnChange(i, task.id)}
                        />
                      </div>
                      <div className="m-1 content-center">{task.title}</div>
                      <div className="m-1">{task.description}</div>
                      <div className="m-1">{task.timeEstimate}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};
