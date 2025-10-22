import './App.css';
import UserList from './UserList';
import Navbar from './components/Navbar';
import UserFormModal from './components/UserFormModal';
import ErrorBoundary from './components/ErrorBoundary';
import React, { useState, useCallback } from 'react';
import { Toaster } from 'react-hot-toast';

function App() {
  const [reload, setReload] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userCount, setUserCount] = useState(0);
  
  const handleUserAdded = useCallback(() => {
    setReload(prev => !prev);
    setIsModalOpen(false);
  }, []);
  
  const handleEditUser = useCallback((user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  }, []);
  
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingUser(null);
  }, []);
  
  const handleOpenModal = useCallback(() => {
    setEditingUser(null);
    setIsModalOpen(true);
  }, []);
  
  const handleUserCountChange = useCallback((count) => {
    setUserCount(count);
  }, []);
  
  return (
    <ErrorBoundary>
      <Toaster />
      <div className="App">
        <Navbar 
          userCount={userCount} 
          onAddClick={handleOpenModal}
        />
        
        <main className="main-content">
          <div className="container">
            <UserList 
              key={reload} 
              onEditUser={handleEditUser}
              onUserCountChange={handleUserCountChange}
            />
          </div>
        </main>
        
        <UserFormModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          editingUser={editingUser}
          onSuccess={handleUserAdded}
        />
      </div>
    </ErrorBoundary>
  );
}

export default App;
