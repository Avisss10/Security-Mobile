import { useState, useRef, useEffect } from 'react';
import { MoreVertical } from 'lucide-react';

const ReportCard = ({
  id_laporan,
  name,
  nip,
  location,
  message,
  time,
  date,
  foto = [],
  jenis,
  judul,
  cuaca,
  canDelete = false,
  onDelete = () => {},
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getDayName = (tanggal) => {
    return new Date(tanggal).toLocaleDateString('id-ID', { weekday: 'long' });
  };

  const handleManualDownload = async (path) => {
    try {
      const response = await fetch(`http://localhost:5000/uploads/${path}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = path;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert('Gagal download gambar');
      console.error(err);
    }
  };

  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm mb-4 relative">
      {/* Titik 3 hanya jika milik user */}
      {canDelete && (
        <div className="absolute top-2 right-2" ref={menuRef}>
          <button onClick={() => setShowMenu(!showMenu)}>
            <MoreVertical className="w-4 h-4 text-gray-500" />
          </button>
          {showMenu && (
            <div className="absolute right-0 top-6 bg-white border border-gray-200 rounded shadow-md z-10 text-sm">
              <button
                className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                onClick={() => {
                  onDelete();
                  setShowMenu(false);
                }}
              >
                Hapus
              </button>
            </div>
          )}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M5.121 17.804A9 9 0 1118.88 17.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <div className="text-sm font-semibold text-black">
          {name} <span className="text-gray-500 font-normal">- {nip} • {location}</span>
        </div>
      </div>

      {/* Foto */}
      {foto.length > 0 && (
        <div className="flex gap-2 overflow-x-auto mb-3">
          {foto.map((src, index) => (
            <div key={index} className="relative group">
              <img
                src={`http://localhost:5000/uploads/${src.foto_path}`}
                alt={`foto-${index}`}
                className="w-32 h-20 object-cover rounded shadow cursor-pointer hover:brightness-90"
                onClick={() => setSelectedImage(src.foto_path)}
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleManualDownload(src.foto_path);
                }}
                className="absolute bottom-1 right-1 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded hidden group-hover:block"
              >
                Download
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Info */}
      <div className="text-sm text-black space-y-1">
        <p><strong>Jenis:</strong> {jenis}</p>
        <p><strong>Judul:</strong> {judul}</p>
        <p><strong>Cuaca:</strong> {cuaca}</p>
        <p className="pt-1">{message}</p>
      </div>

      {/* Footer waktu */}
      <div className="text-xs text-gray-500 text-right mt-3">
        {getDayName(date)} · {time} WIB · {new Date(date).toLocaleDateString('id-ID')}
      </div>

      {/* Modal Preview */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="bg-white rounded p-4 relative max-w-[90vw] max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <img
              src={`http://localhost:5000/uploads/${selectedImage}`}
              alt="Preview"
              className="max-h-[70vh] mx-auto rounded"
            />
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={() => setSelectedImage(null)}
                className="bg-gray-700 text-white px-4 py-1 rounded text-sm hover:bg-gray-800"
              >
                Tutup
              </button>
              <button
                onClick={() => handleManualDownload(selectedImage)}
                className="bg-purple-600 text-white px-4 py-1 rounded text-sm hover:bg-purple-700"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportCard;
