import './App.css';
import UserList from './UserList';
import AddUser from './AddUser';
import React, { useState } from 'react';

function App() {
  const [reload, setReload] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  
  const handleUserAdded = () => setReload(!reload);
  
  const handleEditUser = (user) => {
    setEditingUser(user);
  };
  
  const handleCancelEdit = () => {
    setEditingUser(null);
  };
  
  return (
    <div className="App">
      <div className="left-panel">
        <div className="form-container">
          <div className="brand-header">
            <div className="brand-logo">⚡</div>
            <h1 className="brand-title">User Manager</h1>
            <p className="brand-subtitle">
              Hệ thống quản lý người dùng hiện đại
              frontend đã sử ở đây 
            </p>
          </div>
          <AddUser 
            onUserAdded={handleUserAdded} 
            editingUser={editingUser}
            onCancelEdit={handleCancelEdit}
          />
        </div>
      </div>
      
      <div className="right-panel">
        <UserList key={reload} onEditUser={handleEditUser} />
      </div>
    </div>
  );
}

export default App;
