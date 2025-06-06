
import { getLaporanHariIni, insertLaporan, deleteLaporanIfOwned } from '../models/laporanModel.js';

export const getDashboardLaporan = async (req, res) => {
  const { id_user, id_cabang } = req.params;
  try {
    const laporan = await getLaporanHariIni(id_user, id_cabang);
    res.json(laporan);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil laporan', error: err.message });
  }
};

export const createLaporan = async (req, res) => {
  try {
    const {
      id_user, id_cabang, jenis_laporan,
      judul_laporan, kondisi_cuaca, deskripsi_laporan
    } = req.body;

    const files = req.files || [];

    await insertLaporan({
      id_user,
      id_cabang,
      jenis_laporan,
      judul_laporan,
      kondisi_cuaca,
      deskripsi_laporan,
      foto_paths: files.map(file => file.filename),
    });

    res.json({ message: 'Laporan berhasil disimpan' });
  } catch (err) {
    console.error('CREATE LAPORAN ERROR:', err);
    res.status(500).json({
      message: 'Gagal simpan laporan',
      error: err.message,
    });
  }
};
export const getLaporanById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(
      `SELECT l.*, u.nama_user, u.nip, c.nama_cabang,
              TIME_FORMAT(l.waktu_laporan, '%H:%i') AS waktu_laporan
       FROM laporan l
       JOIN user u ON l.id_user = u.id_user
       JOIN cabang c ON l.id_cabang = c.id_cabang
       WHERE l.id_laporan = ?`,
      [id]
    );

    if (rows.length === 0) return res.status(404).json({ message: 'Laporan tidak ditemukan' });

    const [fotos] = await pool.query(
      'SELECT foto_path FROM foto_laporan WHERE id_laporan = ?',
      [id]
    );

    const laporan = rows[0];
    laporan.foto = fotos.map(f => f.foto_path);

    res.json(laporan);
  } catch (err) {
    res.status(500).json({ message: 'Gagal ambil detail laporan', error: err.message });
  }
};


export const deleteLaporan = async (req, res) => {
  const { id_laporan, id_user } = req.params;
  try {
    const deleted = await deleteLaporanIfOwned(id_laporan, id_user);
    if (!deleted) {
      return res.status(403).json({ message: 'Tidak bisa menghapus laporan orang lain' });
    }
    res.json({ message: 'Laporan berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: 'Gagal hapus laporan', error: err.message });
  }
};
