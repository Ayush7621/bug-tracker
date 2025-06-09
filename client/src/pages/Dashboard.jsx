import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Get token from localStorage
  const token = localStorage.getItem('token');

  // If no token, redirect to login
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  // Fetch all projects
  const fetchProjects = async () => {
    try {
      const res = await axios.get('http://localhost:5050/api/projects', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProjects(res.data);
    } catch (err) {
      console.error('Fetch projects error:', err.response?.data || err.message);
      setMessage(err.response?.data?.msg || 'Error loading projects');
    }
  };

  useEffect(() => {
    if (token) {
      fetchProjects();
    }
  }, [token]);

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending token:", token);
    try {
      const res = await axios.post('http://localhost:5050/api/projects', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProjects([...projects, res.data]);
      setFormData({ title: '', description: '' });
      setMessage('✅ Project created!');
    } catch (err) {
      console.error("Project creation error:", err.response?.data || err.message);
      setMessage(err.response?.data?.msg || '❌ Project creation failed');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Project Dashboard</h1>

      <form onSubmit={handleSubmit} className="mb-6 bg-white shadow-md rounded px-8 pt-6 pb-8">
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Create Project
        </button>
        {message && <p className="mt-2 text-sm text-center text-red-600">{message}</p>}
      </form>

      <div>
        <h2 className="text-xl font-semibold mb-2">Your Projects</h2>
        <ul>
          {projects.map((proj) => (
            <li key={proj._id} className="border-b py-2">
              <strong>{proj.title}</strong>
              <p className="text-sm text-gray-600">{proj.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;