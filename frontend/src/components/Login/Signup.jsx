import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [signupData, setSignupData] = useState({ email: '', password: '', confirmPassword: '' });

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', signupData);
      setUser(response.data); 
      localStorage.setItem('token', response.data.token); 
      toast.success('Account created successfully!');
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error('Signup failed');
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Sign up</h2>
      <form onSubmit={handleSignupSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={signupData.username}
          onChange={handleSignupChange}
          className="w-full p-2 mb-4 border border-gray-700 rounded bg-gray-800 text-white"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={signupData.email}
          onChange={handleSignupChange}
          className="w-full p-2 mb-4 border border-gray-700 rounded bg-gray-800 text-white"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={signupData.password}
          onChange={handleSignupChange}
          className="w-full p-2 mb-4 border border-gray-700 rounded bg-gray-800 text-white"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={signupData.confirmPassword}
          onChange={handleSignupChange}
          className="w-full p-2 mb-4 border border-gray-700 rounded bg-gray-800 text-white"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Sign up
        </button>
      </form>
    </>
  );
};

export default Signup;
