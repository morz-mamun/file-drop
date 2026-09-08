-- Initial schema: users and files tables

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    username VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS files (
    id TEXT PRIMARY KEY,
    email VARCHAR(255) NOT NULL REFERENCES users(email) ON DELETE CASCADE,
    fileName TEXT NOT NULL,
    fileType TEXT NOT NULL,
    fileSize BIGINT NOT NULL,
    fileUrl TEXT NOT NULL,
    createdAt TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_files_email ON files(email);
