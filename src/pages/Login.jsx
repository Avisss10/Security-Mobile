import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

      const { id_user, id_cabang, nama_user } = res.data;
      localStorage.setItem('id_user', id_user);
      localStorage.setItem('id_cabang', id_cabang);
      localStorage.setItem('nama_user', nama_user);

      navigate('/');
    } catch (err) {
      setError('NIP atau password salah.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-6">Security Login</h1>

      <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
        {error && <div className="text-red-500 text-sm">{error}</div>}

        <input
          type="text"
          placeholder="NIP"
          value={nip}
          onChange={(e) => setNip(e.target.value)}
          className="w-full border px-4 py-2 rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-4 py-2 rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
