import db from '../bootstrap/db.js'
import employeeRepo from './employe/employe.js'
import authRepo from './auth/auth.js'
import logRepo from './log_trx_api/log_trx_api.js'

const Repository = {
  Employee: employeeRepo(db),
  Auth: authRepo(db),
  Log: logRepo(db)
};

export default Repository;
