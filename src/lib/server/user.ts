import db from './db';
import { createSession, generateSessionToken, type User } from './session';

export async function register(user: Omit<User, 'id'>) {
  const existingUser = db
    .query('SELECT * FROM user WHERE user.username=?1 OR user.email = ?2')
    .get(user.username, user.email);
  if (existingUser) {
    throw new Error('User already exists in the database');
  }
  const uuid = crypto.randomUUID();
  const hashedPassword = await Bun.password.hash(user.password);
  const insertQuery = db.query(
    'INSERT INTO user (id, username, email, password) VALUES(?1, ?2, ?3, ?4)',
  );
  const { changes } = insertQuery.run(uuid, user.username, user.email, hashedPassword);
  if (!changes) {
    throw new Error('There was a problem processing your request');
  }
  insertQuery.finalize();
}

export async function login(auth: string, pass: string) {
  const user = db.query('SELECT * from user WHERE username=?1 OR email=?1').get(auth) as
    | User
    | undefined;

  if (!user) {
    throw new Error('Username or password is incorrect');
  }

  const verified = await Bun.password.verify(pass, user.password);
  if (!verified) {
    throw new Error('Username or password is incorrect');
  }

  const token = generateSessionToken();
  const session = createSession(token, user.id);
  return { token, session };
}
