import React, { useState, useCallback } from 'react';
import Navbar from '../components/Navbar';
import UserTable from '../components/UserTable';
import UserFormModal from '../components/UserFormModal';

const UsersPage = () => {
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
    <>
      <Navbar 
        userCount={userCount} 
        onAddClick={handleOpenModal}
      />

      <main className="main-content">
        <div className="container">
          <UserTable 
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
    </>
  );
};

export default UsersPage;
