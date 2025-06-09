import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5050/api/auth/register', formData);
      setMessage(res.data.msg);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Something went wrong');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg p-8 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} className="mb-2 w-full p-2 border" />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="mb-2 w-full p-2 border" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="mb-4 w-full p-2 border" />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Register</button>
        {message && <p className="mt-4 text-sm text-center">{message}</p>}
      </form>
    </div>
  );
}

export default Register;