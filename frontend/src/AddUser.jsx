import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddUser = ({ onUserAdded, editingUser, onCancelEdit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
    } else {
      setName('');
      setEmail('');
    }
  }, [editingUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      alert('⚠️ Vui lòng nhập đầy đủ thông tin');
      return;
    }
    try {
      if (editingUser) {
        // Update existing user
        await axios.put(`http://localhost:3000/api/users/${editingUser.id}`, { name, email });
      } else {
        // Create new user
        await axios.post('http://localhost:3000/api/users', { name, email });
      }
      setName('');
      setEmail('');
      if (onUserAdded) onUserAdded();
      if (onCancelEdit) onCancelEdit();
    } catch (err) {
      alert('❌ Lỗi khi ' + (editingUser ? 'cập nhật' : 'thêm') + ' người dùng');
    }
  };

  const handleCancel = () => {
    setName('');
    setEmail('');
    if (onCancelEdit) onCancelEdit();
  };

  return (
    <div className="add-user-form">
      <h2 className="form-title">
        {editingUser ? 'Chỉnh Sửa Người Dùng' : 'Thêm Người Dùng'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Họ và Tên</label>
          <input
            id="name"
            type="text"
            placeholder="Nhập họ và tên đầy đủ"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="form-buttons">
          <button type="submit" className="btn-submit">
            {editingUser ? 'Cập Nhật' : 'Thêm Người Dùng'}
          </button>
          {editingUser && (
            <button type="button" className="btn-cancel" onClick={handleCancel}>
              Hủy
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddUser;
