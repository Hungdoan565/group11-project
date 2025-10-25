import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Plus, Zap } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ userCount, onAddClick }) => {
  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="navbar-logo" aria-hidden="true">
            <Zap size={28} />
          </div>
          <div className="navbar-title-group">
            <h1 className="navbar-title">User Manager</h1>
            <p className="navbar-subtitle">Hệ thống quản lý người dùng</p>
          </div>
        </div>
        
        <div className="navbar-actions">
          <div className="user-count-badge" aria-live="polite">
            <Users size={16} className="user-count-icon" aria-hidden="true" />
            <span className="user-count-text">
              <strong>{userCount}</strong> người dùng
            </span>
          </div>
          
          <Link className="btn-secondary" to="/login" aria-label="Đăng nhập">
            Đăng nhập
          </Link>
          <Link className="btn-primary" to="/signup" aria-label="Đăng ký">
            Đăng ký
          </Link>
          
          <button 
            className="btn-primary"
            onClick={onAddClick}
            aria-label="Thêm người dùng mới"
          >
            <Plus size={18} aria-hidden="true" />
            Thêm người dùng
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
