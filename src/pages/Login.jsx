import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate a network request to your Node.js backend
    setTimeout(() => {
      // 1. Save the fake JWT token to localStorage (just like api.js expects!)
      localStorage.setItem('anirescue_token', 'mock_jwt_volunteer_token_123');
      
      // 2. Redirect to the Volunteer Dashboard
      navigate('/volunteer');
    }, 1500);
  };

  return (
    <div className="min-h-[calc(100vh-76px)] flex items-center justify-center bg-slate-50 p-4">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🐾</div>
          <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-sm text-gray-500 mt-1">Sign in to manage rescue operations</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
              placeholder="volunteer@anirescue.org"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-emerald-600 text-white p-3.5 rounded-lg font-bold text-md hover:bg-emerald-700 transition-colors shadow-sm disabled:bg-emerald-400 mt-2"
          >
            {isLoading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Want to help? <a href="#" className="text-emerald-600 font-bold hover:underline">Apply as a Volunteer</a>
        </p>
      </div>
    </div>
  );
}