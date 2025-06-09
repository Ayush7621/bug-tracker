import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [ticketForm, setTicketForm] = useState({});
  const [ticketsByProject, setTicketsByProject] = useState({});
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Redirect to login if no token
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
      setMessage(err.response?.data?.msg || 'Error loading projects');
    }
  };

  useEffect(() => {
    if (token) fetchProjects();
  }, [token]);

  // Handle project form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle project form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5050/api/projects', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProjects([...projects, res.data]);
      setFormData({ title: '', description: '' });
      setMessage('✅ Project created!');
    } catch (err) {
      setMessage(err.response?.data?.msg || '❌ Project creation failed');
    }
  };

  // Handle ticket input change
  const handleTicketChange = (projectId, field, value) => {
    setTicketForm({
      ...ticketForm,
      [projectId]: { ...ticketForm[projectId], [field]: value }
    });
  };

  // Submit a ticket
  const submitTicket = async (projectId) => {
    const data = ticketForm[projectId];
    try {
      const res = await axios.post('http://localhost:5050/api/tickets', {
        ...data,
        projectId
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      fetchTickets(projectId); // refresh ticket list
      setTicketForm({ ...ticketForm, [projectId]: {} });
    } catch (err) {
      setMessage(err.response?.data?.msg || '❌ Ticket creation failed');
    }
  };

  // Fetch tickets for a project
  const fetchTickets = async (projectId) => {
    try {
      const res = await axios.get(`http://localhost:5050/api/tickets/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTicketsByProject({ ...ticketsByProject, [projectId]: res.data });
    } catch (err) {
      setMessage(err.response?.data?.msg || '❌ Could not load tickets');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Project Dashboard</h1>

      {/* Project Form */}
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

      {/* Project List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Projects</h2>
        <ul>
          {projects.map((proj) => (
            <li key={proj._id} className="mb-6 border-b pb-4">
              <strong className="text-lg">{proj.title}</strong>
              <p className="text-sm text-gray-600">{proj.description}</p>

              {/* Ticket Form */}
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Ticket Title"
                  value={ticketForm[proj._id]?.title || ''}
                  onChange={(e) =>
                    handleTicketChange(proj._id, 'title', e.target.value)
                  }
                  className="border p-2 mb-2 mr-2"
                />
                <input
                  type="text"
                  placeholder="Priority (Low/Medium/High)"
                  value={ticketForm[proj._id]?.priority || ''}
                  onChange={(e) =>
                    handleTicketChange(proj._id, 'priority', e.target.value)
                  }
                  className="border p-2 mb-2 mr-2"
                />
                <button
                  onClick={() => submitTicket(proj._id)}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Create Ticket
                </button>
              </div>

              {/* Fetch and show tickets */}
              <button
                onClick={() => fetchTickets(proj._id)}
                className="text-sm mt-2 text-blue-600"
              >
                Show Tickets
              </button>

              {ticketsByProject[proj._id] && (
                <ul className="mt-2">
                  {ticketsByProject[proj._id].map((ticket) => (
                    <li
                      key={ticket._id}
                      className="bg-white border p-2 my-2 rounded"
                    >
                      <strong>{ticket.title}</strong> - <em>{ticket.priority}</em> - {ticket.status}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;