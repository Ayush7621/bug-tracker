import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;
    if (!email || !password) {
      setMessage('Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5050/api/auth/login', formData);

      // Save token to localStorage
      localStorage.setItem('token', res.data.token);

      setMessage('Login successful!');
      
      // Redirect to dashboard after short delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg p-8 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="mb-2 w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="mb-4 w-full p-2 border border-gray-300 rounded"
        />
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {message && <p className="mt-4 text-sm text-center text-red-600">{message}</p>}
      </form>
    </div>
  );
}

export default Login;