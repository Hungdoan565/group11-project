import './App.css';
import UserList from './UserList';
import AddUser from './AddUser';
import ErrorBoundary from './components/ErrorBoundary';
import React, { useState, useCallback } from 'react';
import { Toaster } from 'react-hot-toast';

function App() {
  const [reload, setReload] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  
  const handleUserAdded = useCallback(() => setReload(prev => !prev), []);
  
  const handleEditUser = useCallback((user) => {
    setEditingUser(user);
  }, []);
  
  const handleCancelEdit = useCallback(() => {
    setEditingUser(null);
  }, []);
  
  return (
    <ErrorBoundary>
      <Toaster />
      <div className="App">
      <div className="left-panel">
        <div className="form-container">
          <div className="brand-header">
            <div className="brand-logo">⚡</div>
            <h1 className="brand-title">User Manager</h1>
            <p className="brand-subtitle">
              Hệ thống quản lý người dùng hiện đại
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
    </ErrorBoundary>
  );
}

export default App;
