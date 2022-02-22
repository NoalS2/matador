import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ApiContext } from '../../utils/api_context';
import { AuthContext } from '../../utils/auth_context';
import { RolesContext } from '../../utils/roles_context';
import { Button } from '../common/button';
import { Input } from '../common/input';
import { Projects } from './projects';

export const Home = () => {
  const [, setAuthToken] = useContext(AuthContext);
  const [newTitle, setNewTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [projects, setProjects] = useState([]);
  const api = useContext(ApiContext);
  const roles = useContext(RolesContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(async () => {
    const res = await api.get('/users/me');
    setUser(res.user);

    const { projects } = await api.get('/projects');
    setProjects(projects);

    setLoading(false);
    document.getElementById('newTitle').focus();
  }, []);

  const logout = async () => {
    const res = await api.del('/sessions');
    if (res.success) {
      setAuthToken(null);
    }
  };

  const saveProject = async () => {
    setErrorMessage('');
    if (newTitle === '') {
      setErrorMessage('New Title was not provided.');
      document.getElementById('newTitle').focus();
      return;
    }
    const projectBody = {
      title: newTitle,
    };
    const { project } = await api.post('/projects', projectBody);
    setProjects([...projects, project]);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="p-4">
        <h1>Welcome {user.firstName}</h1>
        <Button type="button" onClick={logout}>
          Logout
        </Button>
        {roles.includes('admin') && (
          <Button type="button" onClick={() => navigate('/admin')}>
            Admin
          </Button>
        )}
      </div>
      <div className="p-4">
        <h1>New Project's Title</h1>
        <Input type="title" id="newTitle" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
        <Button type="button" onClick={saveProject}>
          Create New Project
        </Button>
        <div className="text-red-600">{errorMessage}</div>
        <Projects projects={projects} />
      </div>
    </>
  );
};
