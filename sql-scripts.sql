CREATE TABLE user (
    id TEXT NOT NULL PRIMARY KEY,
    username VARCHAR(20) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL
    created_on DATE NOT NULL DEFAULT current_timestamp
);

CREATE TABLE session (
    id TEXT NOT NULL PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES user(id),
    expires_at INTEGER NOT NULL
);

CREATE TABLE capsule (
    id TEXT NOT NULL PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES user(id),
    title TEXT NOT NULL CHECK(LENGTH(title) <= 100),
    message TEXT NOT NULL CHECK(LENGTH(message) <= 1000),
    picture VARCHAR(30), 
    send_on DATE NOT NULL,
    sent BOOLEAN NOT NULL,
    created_on DATE NOT NULL DEFAULT current_timestamp
);