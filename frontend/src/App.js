import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fazer uma requisição ao backend
    axios.get('http://localhost:3000/api/test')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('Erro ao conectar com o backend:', error);
      });
  }, []);

  return (
    <div>
      <h1>NeonShadowFeed</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;