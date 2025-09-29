import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

function LogoutButton() {
  const dispatch = useDispatch();
  return <button className="btn-danger" onClick={() => dispatch(logout())}>Logout</button>;
}
export default LogoutButton;
