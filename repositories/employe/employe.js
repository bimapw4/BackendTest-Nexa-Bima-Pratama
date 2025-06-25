export default (db) => {
  return {
    getAll: async (keyword, start, count) => {
        const query = `
            SELECT * FROM karyawan
            WHERE nama LIKE ?
            ORDER BY insert_at DESC
            LIMIT ?, ?
        `;
        const [rows] = await db.query(query, [`%${keyword}%`, start, count]);
        return rows;
    },
    getById: async (id) => {
      const [rows] = await db.query('SELECT * FROM karyawan WHERE id = ?', [id]);
      return rows[0];
    },
    getByYear: async (year) => {
      const [rows] = await db.query("SELECT nip FROM karyawan WHERE nip LIKE ?", [`${year}%`]);
      return rows;
    },
    getByNip: async (nip) => {
      const [rows] = await db.query("SELECT * FROM karyawan WHERE nip = ?", [nip]);
      return rows[0];
    },
    create: async (emp) => {
      const [result] = await db.query(
        `INSERT INTO karyawan (id, nip, nama, alamat, gend, photo, tgl_lahir, status, insert_at, insert_by)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          emp.id, emp.nip, emp.nama, emp.alamat, emp.gend,
          emp.photo, emp.tgl_lahir, emp.status,
          emp.insert_at, emp.insert_by
        ]
      );
      return result;
    },
    updateByNip: async (nip, data) => {
        const [result] = await db.query(`
            UPDATE karyawan SET
            nama = ?, alamat = ?, gend = ?, photo = ?, tgl_lahir = ?, status = ?,
            update_at = ?, update_by = ?
            WHERE nip = ?
        `, [
            data.nama, data.alamat, data.gend, data.photo, data.tgl_lahir, data.status,
            new Date(), data.update_by,
            nip
        ]);
        return result;
    },
    deactivateByNip: async (nip, update_by) => {
        const [result] = await db.query(`
            UPDATE karyawan SET
            status = 9,
            update_at = ?,
            update_by = ?
            WHERE nip = ?
        `, [new Date(), update_by, nip]);

        return result;
    },
  };
};
