import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('projects', {
      title: `Mobile com React Native ${Date.now()}`,
      owner: "Lucas"
    });

    const newProject = response.data;

    setProjects([...projects, newProject]);
  }

  async function handleRemoveRepository(id) {
    
    const project = projects.filter(p => p.id !== id);
    setProjects(project);

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map(project => (
          <li key={project.id}>
            <p>{project.title}</p>                    

            <button onClick={() => handleRemoveRepository(project.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
