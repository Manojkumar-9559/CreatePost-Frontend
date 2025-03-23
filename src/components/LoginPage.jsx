import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiUrl } from './ApiUrl';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validateFields = () => {
    let isValid = true;
    let tempErrors = { email: '', password: '' };

    if (!email) {
      tempErrors.email = 'Email is required.';
      isValid = false;
    }

    if (!password) {
      tempErrors.password = 'Password is required.';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateFields()) return;

    try {
      const response = await axios.post(`${ApiUrl}/login`, { email, password });
      console.log(response.data.user);

      if (response.status === 200) {
        const token = response.data.token;
        // Store the token (localStorage or sessionStorage)
        localStorage.setItem('token', token);
        alert(response.data.message);
        navigate('/home', { state: response.data.user });
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className='bg-lime-600 w-full h-screen fixed flex justify-center items-center'>
      <div className='w-[40%] h-[60%] rounded-3xl border flex flex-col items-center border-blue-600 border-5 bg-gray-300'>
        <h1 className='text-purple-600 font-bold text-3xl mt-10'>LOGIN FORM</h1>

        {/* Email Field */}
        <label className='mt-4'>Email</label>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Enter your email'
          className={`w-[80%] p-2 rounded-md border ${
            errors.email ? 'border-red-500' : 'border-gray-400'
          }`}
        />
        {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email}</p>}

        {/* Password Field */}
        <label className='mt-4'>Password</label>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Enter your password'
          className={`w-[80%] p-2 rounded-md border ${
            errors.password ? 'border-red-500' : 'border-gray-400'
          }`}
        />
        {errors.password && <p className='text-red-500 text-sm mt-1'>{errors.password}</p>}

        {/* Submit Button */}
        <button
          className='border mt-5 text-white border-5 bg-purple-600 px-12 py-1 rounded-xl'
          onClick={handleSubmit}
        >
          Submit
        </button>

        {/* Register Link */}
        <span className='flex mt-2'>
          <h2>Don't have an account?</h2>
          <h2
            className='text-purple-600 cursor-pointer ml-1'
            onClick={() => navigate('/signup')}
          >
            Register Now
          </h2>
        </span>
      </div>
    </div>
  );
};

export default LoginPage;
