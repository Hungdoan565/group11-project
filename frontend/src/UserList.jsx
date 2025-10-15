import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = ({ onEditUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:3000/api/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Lỗi khi lấy danh sách người dùng', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Bạn có chắc muốn xóa người dùng "${name}"?`)) {
      return;
    }
    try {
      await axios.delete(`http://localhost:3000/api/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      alert('❌ Lỗi khi xóa người dùng');
    }
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div>
        <div className="user-list-header">
          <h2 className="user-list-title">Danh Sách Người Dùng</h2>
        </div>
        <div className="empty-state">
          <div className="empty-state-icon">⏳</div>
          <p className="empty-state-text">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="user-list-header">
        <h2 className="user-list-title">Danh Sách Người Dùng</h2>
        <div className="user-count">{users.length} người dùng</div>
      </div>
      
      {users.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">👥</div>
          <p className="empty-state-text">Chưa có người dùng nào trong hệ thống</p>
        </div>
      ) : (        <ul className="user-list">
          {users.map(user => (
            <li key={user.id} className="user-item">
              <div className="user-avatar">{getInitials(user.name)}</div>
              <div className="user-info">
                <div className="user-name">{user.name}</div>
                <div className="user-email">{user.email}</div>
              </div>
              <div className="user-actions">
                <button 
                  className="btn-edit"
                  onClick={() => onEditUser(user)}
                  title="Chỉnh sửa"
                >
                  ✏️
                </button>
                <button 
                  className="btn-delete"
                  onClick={() => handleDelete(user.id, user.name)}
                  title="Xóa"
                >
                  🗑️
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
