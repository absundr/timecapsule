import db from '$lib/server/db';

db.exec(
  `
    create table if not exists user (
    id TEXT NOT NULL PRIMARY KEY,
    username VARCHAR(20) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    created_on DATE NOT NULL DEFAULT current_timestamp,
    verified BOOLEAN NOT NULL DEFAULT false
)
    `,
);

db.exec(
  `
    create table if not exists session (
    id TEXT NOT NULL PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES user(id),
    expires_at INTEGER NOT NULL
)
    `,
);

db.exec(
  `
    create table if not exists capsule (
    id TEXT NOT NULL PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES user(id),
    title TEXT NOT NULL CHECK(LENGTH(title) <= 100),
    message TEXT NOT NULL CHECK(LENGTH(message) <= 1000),
    picture VARCHAR(30), 
    send_on DATE NOT NULL,
    sent BOOLEAN NOT NULL,
    created_on DATE NOT NULL DEFAULT current_timestamp
)
    `,
);

db.exec(
  `
    create table if not exists verification (
    email VARCHAR(50) NOT NULL PRIMARY KEY REFERENCES user(email),
    otp CHAR(4) NOT NULL,
    created_on INTEGER NOT NULL,
    expires_at INTEGER NOT NULL
)
    `,
);
