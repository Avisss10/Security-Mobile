import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImagePlus, Shield } from 'lucide-react';
import axios from 'axios';


const CreateReport = () => {
  const navigate = useNavigate();

  const [jenis, setJenis] = useState('');
  const [judul, setJudul] = useState('');
  const [cuaca, setCuaca] = useState('');
  const [message, setMessage] = useState('');
  const [images, setImages] = useState([]);        
  const [imageFiles, setImageFiles] = useState([]); 

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(files.map(file => URL.createObjectURL(file)));
    setImageFiles(files);
  };

  const handleSubmit = async () => {
    const id_user = localStorage.getItem('id_user');
    const id_cabang = localStorage.getItem('id_cabang');

    if (!id_user || !id_cabang) {
      alert('User belum login!');
      return;
    }

    if (!jenis || !judul || !cuaca || !message) {
      alert('Semua field wajib diisi!');
      return;
    }

    const formData = new FormData();
    formData.append('id_user', id_user);
    formData.append('id_cabang', id_cabang);
    formData.append('jenis_laporan', jenis);
    formData.append('judul_laporan', judul);
    formData.append('kondisi_cuaca', cuaca);
    formData.append('deskripsi_laporan', message);
    imageFiles.forEach(file => formData.append('foto', file)); // ✅ multiple


    try {
      await axios.post('http://localhost:5000/laporan', formData);
      alert('Laporan berhasil dikirim!');
      navigate('/');
    } catch (err) {
      console.error('Upload error:', err);
      alert('Gagal mengirim laporan: ' + err.message);
    }

  };

  return (
    <div className="min-h-screen p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-bold text-purple-600">SECURITY</div>
            <div className="text-sm text-purple-500 font-bold">REPORT</div>
          </div>
        </div>

        <div className="space-x-2">
          <button
            className="border border-black px-4 py-1 rounded-full text-sm"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 rounded-full text-sm"
            onClick={handleSubmit}
          >
            Post
          </button>
        </div>
      </div>

      <h2 className="text-sm font-semibold mb-2">New Report</h2>

      {/* Jenis */}
      <select
        value={jenis}
        onChange={(e) => setJenis(e.target.value)}
        className="w-full border px-3 py-2 rounded-md mb-4 text-sm"
      >
        <option value="">Jenis</option>
        <option value="Luar Gedung">Luar Gedung</option>
        <option value="Dalam Gedung">Dalam Gedung</option>
        <option value="Serah Terima">Serah Terima</option>
        <option value="Kegiatan">Kegiatan</option>
        <option value="Lain">Lain</option>
      </select>

      {/* Judul */}
      <input
        type="text"
        placeholder="Judul Laporan"
        value={judul}
        onChange={(e) => setJudul(e.target.value)}
        className="w-full border px-3 py-2 rounded-md mb-4 text-sm"
      />

      {/* Cuaca */}
      <input
        type="text"
        placeholder="Kondisi Cuaca"
        value={cuaca}
        onChange={(e) => setCuaca(e.target.value)}
        className="w-full border px-3 py-2 rounded-md mb-4 text-sm"
      />

      {/* Deskripsi */}
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Deskripsi Laporan"
        className="w-full border px-3 py-2 rounded-md mb-4 text-sm h-24 resize-none"
      />

      {/* Gambar */}
      <label
        htmlFor="image-upload"
        className="w-full border border-dashed px-3 py-6 rounded-md flex flex-col items-center justify-center cursor-pointer text-gray-400 text-sm"
      >
      {images.length > 0 ? (
        <img src={images[0]} alt="Uploaded" className="max-h-40 object-contain" />
      ) : (
        <>
          <ImagePlus className="w-6 h-6 mb-1" />
          Add Picture
        </>
      )}
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleImageUpload}
        />
      </label>
    </div>
  );
};

export default CreateReport;
