import jwt from 'jsonwebtoken';
import { loginSchema } from '../../entity/auth.js';
import Repository from '../../repositories/repo.js';

const db = Repository.Auth;
const JWT_SECRET = 'nexatest';


const login = async (payload) => {
  const { error } = loginSchema.validate(payload);
  if (error) throw new Error(error.details[0].message);

  const user = await db.findAdmin(payload.username);
  if (!user) {
    throw new Error('Username atau password salah');
  }

  const token = jwt.sign({ uid: user.id, user: user.username }, JWT_SECRET, {
    expiresIn: '2h'
  });

  await db.storeToken({ admin_id: user.id, token });

  return { token };
};

export default { login };
