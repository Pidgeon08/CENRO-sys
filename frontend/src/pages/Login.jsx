import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      onLogin();
      navigate('/dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-screen bg-gradient-to-br from-indigo-950 to-blue-900">
      <div className="w-full max-w-[440px] py-12 px-8 bg-slate-900/85 text-white border border-white/10 shadow-2xl text-center glass-card animate-fade-in">
        <div className="mb-10">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 mx-auto mb-6 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.5)] font-bold text-white tracking-wider">
            CENRO
          </div>
          <h2 className="text-xl font-semibold mb-2">City Environment and Natural Resources Office</h2>
          <p className="text-slate-400 text-sm">Aquatic Waste Collection System</p>
        </div>
        
        <form onSubmit={handleSubmit} className="text-left">
          {error && (
            <div className="bg-red-500/10 text-red-400 p-3 rounded-md mb-6 text-sm border border-red-500/20">
              {error}
            </div>
          )}
          
          <div className="flex flex-col gap-2 mb-6">
            <label htmlFor="username" className="text-sm font-medium text-slate-300">Username</label>
            <input 
              type="text" 
              id="username" 
              className="py-3 px-4 border rounded-md font-inherit text-base transition-all duration-200 bg-white/10 border-white/20 text-white placeholder-slate-400 focus:outline-none focus:bg-white/15 focus:border-blue-400"
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Enter admin"
              required 
            />
          </div>
          
          <div className="flex flex-col gap-2 mb-6">
            <label htmlFor="password" className="text-sm font-medium text-slate-300">Password</label>
            <input 
              type="password" 
              id="password" 
              className="py-3 px-4 border rounded-md font-inherit text-base transition-all duration-200 bg-white/10 border-white/20 text-white placeholder-slate-400 focus:outline-none focus:bg-white/15 focus:border-blue-400"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter admin123"
              required 
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full mt-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white border-none py-3 px-6 rounded-md font-semibold text-base cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(59,130,246,0.3)] active:translate-y-0.5"
          >
            Login
          </button>
          
          <div className="mt-6 text-center text-sm">
            <a href="#" className="text-slate-400 no-underline transition-colors duration-200 hover:text-white">Forgot password?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
