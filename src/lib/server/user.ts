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
  let { changes } = insertQuery.run(uuid, user.username, user.email, hashedPassword);
  if (!changes) {
    throw new Error('There was a problem processing your request');
  }
  insertQuery.finalize();

  const otp = crypto.randomUUID().slice(0, 4);
  db.query(
    'INSERT INTO verification(email, otp, created_on, expires_at) VALUES(?1, ?2, ?3, ?4)',
  ).run(
    user.email,
    otp,
    Math.floor(Date.now() / 1000),
    Math.floor((Date.now() + 1000 * 60 * 5) / 1000),
  );

  return { otp };
}

export async function login(auth: string, pass: string) {
  const user = db.query('SELECT * from user WHERE username=?1 OR email=?1').get(auth) as
    | User
    | undefined;

  if (!user || !user.verified) {
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

export function verify(email: string, otp: string): boolean {
  const user = db
    .query(
      `
SELECT user.id, user.email, user.verified, verification.otp, verification.expires_at as expiresAt
FROM user
INNER JOIN verification ON user.email = verification.email
WHERE user.email = ?1
`,
    )
    .get(email) as any;
  if (!user || user.otp !== otp || user.verified) {
    return false;
  }

  const expiresAt = new Date(user.expiresAt * 1000);
  if (Date.now() > expiresAt.getTime()) {
    db.query('DELETE FROM verification WHERE email = ?1').run(email);
    throw new Error('OTP has expired please try again');
  }

  db.query('UPDATE user SET verified = true WHERE email = ?1').run(email);
  return true;
}
