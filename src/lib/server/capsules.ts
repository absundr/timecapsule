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
