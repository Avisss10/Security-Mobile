import { useNavigate } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';

const ProfileHeader = () => {
  const navigate = useNavigate();

  const userInfo = {
    name: localStorage.getItem('nama_user') || 'Security',
    nip: localStorage.getItem('nip') || '',
    cabang: 'Cabang ' + (localStorage.getItem('id_cabang') || '-'),
  };

  const handleLogout = () => {
    localStorage.removeItem('id_user');
    localStorage.removeItem('id_cabang');
    localStorage.removeItem('nama_user');
    localStorage.removeItem('nip');
    navigate('/login');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden relative">
      {/* Cover Background */}
      <div className="h-24 bg-gradient-to-r from-purple-600 to-blue-600"></div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 text-white hover:text-gray-100 flex items-center gap-1 text-sm"
      >
        <LogOut className="w-4 h-4" />
        Logout
      </button>

      {/* Profile Content */}
      <div className="px-6 pb-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-12">
          {/* Avatar and Basic Info */}
          <div className="flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative">
              <div className="w-24 h-24 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                <User className="w-12 h-12 text-gray-400" />
              </div>
            </div>

            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold text-gray-900">{userInfo.name}</h1>
              <p className="text-gray-600 font-medium">{userInfo.nip}</p>
              <p className="text-sm text-gray-500">{userInfo.cabang}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
