import { Link } from 'react-router-dom';

export const Projects = ({ projects, ...other }) => {
  return (
    <div className="flex-1">
      {projects.map((project) => {
        return (
          <Link to={'project/' + project.id} key={project.id}>
            <div className="bg-gray-600 pt-2 pb-2 pr-4 pl-4 rounded-lg font-bold text-white flex m-6" {...other}>
              {project.title}
            </div>
          </Link>
        );
      })}
    </div>
  );
};
