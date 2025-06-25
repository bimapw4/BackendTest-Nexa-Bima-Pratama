export default (db) => {
  return {
    findAdmin: async (username) => {
      const [rows] = await db.query(
        "SELECT * FROM admin WHERE username = ?",
        [username]
      );
      return rows[0];
    },
    storeToken: async ({ admin_id, token }) => {
      const [res] = await db.query(
        "INSERT INTO admin_token (id_admin, token, expired_at) VALUES (?, ?, ?)",
        [admin_id, token, new Date(Date.now() + 2 * 60 * 60 * 1000)]
      );
      return res;
    }
  };
};