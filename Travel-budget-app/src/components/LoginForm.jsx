import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { login, register as registerAction } from '../store/authSlice';

function LoginForm() {
  const dispatch = useDispatch();
  const { error } = useSelector(state => state.auth);
  const { register, handleSubmit } = useForm();

  return (
    <div className="bg-white max-w-xs mx-auto rounded shadow p-4">
      <form onSubmit={handleSubmit(data => dispatch(login(data)))}>
        <input {...register('email')} type="email" placeholder="Email" className="input" />
        <input {...register('password')} type="password" placeholder="Password" className="input" />
        <button type="submit" className="btn-primary">Login</button>
      </form>
      <form onSubmit={handleSubmit(data => dispatch(registerAction(data)))}>
        <button type="submit" className="btn-secondary mt-2">Register</button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
export default LoginForm;
