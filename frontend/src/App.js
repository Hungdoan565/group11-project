import './App.css';
import UserList from './UserList';
import AddUser from './AddUser';
import React, { useState } from 'react';

function App() {
  const [reload, setReload] = useState(false);
  const handleUserAdded = () => setReload(!reload);
  return (
    <div className="App">
      <AddUser onUserAdded={handleUserAdded} />
      <UserList key={reload} />
    </div>
  );
}

export default App;
