import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Shield } from 'lucide-react';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const [nip, setNip] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/login', {
        nip,
        password,
      });


      const { id_user, id_cabang, nama_cabang, nama_user, nip: userNip } = res.data;
      localStorage.setItem('id_user', id_user);
      localStorage.setItem('id_cabang', id_cabang);
      localStorage.setItem('nama_cabang', nama_cabang);
      localStorage.setItem('nama_user', nama_user);
      localStorage.setItem('nip', userNip);

      navigate('/');
      toast.success('Login berhasil!', {
        style: { backgroundColor: '#7c3aed', color: 'white' },
      });
    } catch (err) {
      console.error('Login error:', err); // Debug log
      setError('NIP atau password salah.');
      toast.error('NIP atau password salah.', {
        style: { backgroundColor: '#dc2626', color: 'white' },
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white px-4">
      <div className="flex flex-col items-center justify-center mb-8">
        <div className="flex items-center justify-center space-x-3">
          <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <div className="leading-tight">
            <div className="text-lg font-bold text-purple-600">SECURITY</div>
            <div className="text-lg font-bold text-purple-500">REPORT</div>
          </div>
        </div>
      </div>

      {/* Card Login */}
      <div className="bg-violet-50 w-full max-w-xs rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          {error && <div className="text-red-500 text-sm">{error}</div>}

          <input
            type="text"
            placeholder="NIP"
            value={nip}
            onChange={(e) => setNip(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-violet-600 text-white font-semibold py-2 rounded-md hover:bg-violet-700 transition duration-200 text-sm"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
