import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500 text-white">
      <h1 className="text-4xl font-bold mb-6">Bug Tracker App</h1>
      <div className="space-x-4">
        <Link to="/register" className="bg-white text-blue-500 px-4 py-2 rounded font-semibold">Register</Link>
        <Link to="/login" className="bg-white text-purple-500 px-4 py-2 rounded font-semibold">Login</Link>
      </div>
    </div>
  );
}

export default Home;