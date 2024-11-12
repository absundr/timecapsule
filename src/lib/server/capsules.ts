import db from './db';

export type Capsule = {
  id: string;
  userId: string;
  title: string;
  message: string;
  picture: string | null;
  sendOn: string;
  sent: boolean;
  createdOn: string;
};

export type NewCapsule = Omit<Capsule, 'id' | 'sent' | 'createdOn'>;

export function createCapsule(newCapsule: NewCapsule) {
  const query = db.query(`
INSERT INTO capsule (id, user_id, title, message, picture, send_on, sent)
VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7);
`);
  query.run(
    crypto.randomUUID(),
    newCapsule.userId,
    newCapsule.title,
    newCapsule.message,
    newCapsule.picture,
    newCapsule.sendOn,
    false,
  );
  query.finalize();
}

//TODO: pagination
export function getCapsules(userId: string): Capsule[] {
  const query = db.query(`
SELECT id, user_id as userId, title, message, picture, send_on as sendOn, sent, created_on as createdOn 
FROM capsule
WHERE user_id = ?1   
`);
  const capsules = query.all(userId);
  query.finalize();
  return capsules as Capsule[];
}

type CapsulesToSend = {
  userId: string;
  username: string;
  email: string;
  capsuleId: string;
  title: string;
  message: string;
  picture: string;
};

export function getCapsulesToSend(): CapsulesToSend[] {
  const query = db.query(`
select user.id as userId, user.username, user.email, capsule.id as capsuleId, capsule.title, capsule.message, capsule.picture 
from 
  capsule 
inner join 
  user on user.id = capsule.user_id 
where 
  capsule.sent = false and 
  capsule.send_on = date(current_timestamp)
`);
  const capsulesToSend = query.all();
  query.finalize();
  return capsulesToSend as CapsulesToSend[];
}

export function markSent(capsuleIds: string[]) {
  const query = db.prepare(`
update capsule
  set sent = true
  where id = ?1
`);
  for (const id of capsuleIds) {
    query.run(id);
  }
  query.finalize();
}
