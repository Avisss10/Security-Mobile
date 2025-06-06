
import pool from '../config/db.js';

export const findSecurityByNip = async (nip) => {
  const [rows] = await pool.query(
    'SELECT * FROM user WHERE nip = ? AND id_level = 2',
    [nip]
  );
  return rows[0];
};
