import React, { useState, useEffect } from "react";
import Axios from "axios";

const Projects = props => {
  const [projects, setProjects] = useState([]);
  const [actions, setActions] = useState([]);
  const [query, setQuery] = useState({});

  useEffect(() => {
    Axios.get("http://localhost:4003/api/projects")
      .then(res => {
        console.log(res);
        setProjects(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const getActions = id => {
    Axios.get(`http://localhost:4003/api/projects/${id}/actions`)
      .then(res => {
        setActions(res.data);
      })
      .catch(err => console.log(err));
    console.log(actions);
  };

  const handleChange = e => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value
    });
    console.log(query);
  };

  const addProject = () => {
    Axios.post(`http://localhost:4003/api/projects`, query)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <form onSubmit={addProject}>
        <input
          onChange={handleChange}
          name="name"
          placeholder="Project title..."
        />
        <input
          onChange={handleChange}
          name="description"
          placeholder="Notes..."
        />
        <button>Add Project</button>
      </form>
      <br />
      <div className="projects-container">
        {projects.length > 0
          ? projects.map(item => {
              return (
                <div className="project">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <button onClick={() => getActions(item.id)}>
                    View Steps
                  </button>
                  <ol>
                    {actions.length > 0
                      ? actions.map(step => {
                          if (step.project_id === item.id) {
                            return (
                              <li>
                                <h5>{step.description}</h5>
                              </li>
                            );
                          } else {
                            return null;
                          }
                        })
                      : null}
                  </ol>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Projects;