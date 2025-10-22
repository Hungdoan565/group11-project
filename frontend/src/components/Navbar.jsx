import React from 'react';
import './Navbar.css';

const Navbar = ({ userCount, onAddClick }) => {
  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="navbar-logo" aria-hidden="true">⚡</div>
          <div className="navbar-title-group">
            <h1 className="navbar-title">User Manager</h1>
            <p className="navbar-subtitle">Hệ thống quản lý người dùng</p>
          </div>
        </div>
        
        <div className="navbar-actions">
          <div className="user-count-badge" aria-live="polite">
            <span className="user-count-icon" aria-hidden="true">👥</span>
            <span className="user-count-text">
              <strong>{userCount}</strong> người dùng
            </span>
          </div>
          
          <button 
            className="btn-primary"
            onClick={onAddClick}
            aria-label="Thêm người dùng mới"
          >
            <span aria-hidden="true">+</span>
            Thêm người dùng
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
