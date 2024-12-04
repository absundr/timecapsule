import { sha256 } from '@oslojs/crypto/sha2';
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding';
import type { RequestEvent } from '@sveltejs/kit';
import db from './db';

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}

export function createSession(token: string, userId: string): Session {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session: Session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  };

  db.query('INSERT INTO session (id, user_id, expires_at) VALUES ($id, $userId, $expiresAt)').run({
    id: session.id,
    userId: session.userId,
    expiresAt: Math.floor(session.expiresAt.getTime() / 1000),
  });

  return session;
}

export function validateSessionToken(token: string): SessionValidationResult {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const row = db
    .query(
      `SELECT 
  session.id as sessionId,
  session.user_id as sessionUserId,
  session.expires_at as expiresAt,
  user.id as userId,
  user.username as username,
  user.email as email,  
  user.created_on as createdOn,
  user.verified as verified
FROM session 
INNER JOIN user ON user.id = session.user_id 
WHERE session.id = ?1`,
    )
    .get(sessionId) as any;

  if (row === null || row === undefined) {
    return { session: null, user: null };
  }
  const session: Session = {
    id: row.sessionId,
    userId: row.userId,
    expiresAt: new Date(row.expiresAt * 1000),
  };

  const user: User = {
    id: row.userId,
    username: row.username,
    email: row.email,
    password: '',
    createdOn: row.createdOn,
    verified: row.verified,
  };

  if (Date.now() >= session.expiresAt.getTime()) {
    db.query('DELETE FROM session WHERE id = ?1').run(session.id);
    return { session: null, user: null };
  }

  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
    session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
    db.query('UPDATE session SET expires_at = ?1 WHERE id = ?2').run(
      Math.floor(session.expiresAt.getTime() / 1000),
      session.id,
    );
  }
  return { session, user };
}

export function invalidateSession(sessionId: string): void {
  db.query('DELETE FROM session WHERE id = ?1').run(sessionId);
}

export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date): void {
  event.cookies.set('session', token, {
    httpOnly: true,
    sameSite: 'lax',
    expires: expiresAt,
    path: '/',
  });
}

export function deleteSessionTokenCookie(event: RequestEvent): void {
  event.cookies.set('session', '', {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });
}

export type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null };

export interface Session {
  id: string;
  userId: string;
  expiresAt: Date;
}

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  createdOn: Date;
  verified: boolean;
}
