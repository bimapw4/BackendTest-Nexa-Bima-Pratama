import Repository from '../repositories/repo.js';

export const logTransaction = (req, res, next) => {
  const originalJson = res.json;
  const originalSend = res.send;

  let responseBody;

  res.json = function (body) {
    responseBody = body;
    return originalJson.call(this, body);
  };

  res.send = function (body) {
    responseBody = body;
    return originalSend.call(this, body);
  };

  res.on('finish', () => {
    const log = {
      user_id: req.user?.uid || '',
      api: `${req.method} ${req.originalUrl}`,
      request: JSON.stringify(req.body || {}),
      response: typeof responseBody === 'object' ? JSON.stringify(responseBody) : responseBody,
    };

    Repository.Log.insertLog(log).catch((err) => {
      console.error('Gagal simpan log_trx_api:', err.message);
    });
  });

  next();
};
