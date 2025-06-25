export default (db) => ({
  insertLog: async ({ user_id, api, request, response }) => {
    const sql = `
      INSERT INTO log_trx_api (user_id, api, request, response, insert_at)
      VALUES (?, ?, ?, ?, NOW())
    `;
    await db.query(sql, [user_id, api, request, response]);
  }
});