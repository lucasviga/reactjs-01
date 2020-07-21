import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repository, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `reactnative-cameera ${Date.now()}`,
      url: "https://github.com/lucasviga",
      techs: ["Node", "Express", "TypeScript"]
    });

    const newRepo = response.data;

    setRepositories([...repository, newRepo]);
  }

  async function handleRemoveRepository(id) {    
    const repo = repository.filter(p => p.id !== id);
    setRepositories(repo);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repository.map(repo => (
          <li key={repo.id}>
            <p>{repo.title}</p>                    

            <button onClick={() => handleRemoveRepository(repo.id)}>
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
