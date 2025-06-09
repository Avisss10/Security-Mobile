import { useEffect, useState } from 'react';
import axios from 'axios';
import ReportCard from '../components/ReportCard';
import FloatingCreateButton from '../components/FloatingCreateButton';

const Dashboard = () => {
  const [laporan, setLaporan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const id_user = localStorage.getItem('id_user');
  const id_cabang = localStorage.getItem('id_cabang');

  const fetchLaporan = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/laporan/dashboard/${id_user}/${id_cabang}`);
      setLaporan(res.data);
    } catch (err) {
      console.error('Gagal fetch laporan:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id_laporan) => {
    try {
      await axios.delete(`http://localhost:5000/laporan/${id_laporan}/${id_user}`);
      fetchLaporan();
    } catch (err) {
      alert('Gagal hapus laporan');
    }
  };

  useEffect(() => {
    fetchLaporan();
  }, []);

  return (
    <main className="px-4">
      {loading ? (
        <p>Loading...</p>
      ) : laporan.length === 0 ? (
        <p className="text-sm text-gray-500 mt-4">Belum ada laporan hari ini.</p>
      ) : (
        laporan.map((lapor) => (
          <ReportCard
            key={lapor.id_laporan}
            id_laporan={lapor.id_laporan}
            name={lapor.nama_user}
            nip={lapor.nip}
            location={lapor.nama_cabang}
            message={lapor.deskripsi_laporan}
            time={lapor.waktu_laporan}
            date={lapor.tanggal_laporan}
            foto={lapor.foto}
            jenis={lapor.jenis_laporan}
            judul={lapor.judul_laporan}
            cuaca={lapor.kondisi_cuaca}
            canDelete={lapor.canDelete}
            onUpdate={(updated) => {
             setData((prev) =>
                prev.map((lapor) =>
                  lapor.id_laporan === updated.id_laporan ? updated : lapor
                )
              );
           }}
          />
        ))
      )}
      <FloatingCreateButton />
    </main>
  );
};

export default Dashboard;
