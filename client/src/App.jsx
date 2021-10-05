import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [notification, setNotification] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/hello')
      .then((response) => {
        setNotification(response.data);
      });
  }, []);

  return (
    <div className="App">
      {notification}
    </div>
  );
};

export default App;
