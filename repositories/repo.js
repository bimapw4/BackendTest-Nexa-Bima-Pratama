import db from '../bootstrap/db.js'
import employeeRepo from './employe/employe.js'
import authRepo from './auth/auth.js'

const Repository = {
  Employee: employeeRepo(db),
  Auth: authRepo(db),
};

export default Repository;
