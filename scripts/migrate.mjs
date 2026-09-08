import { Pool } from 'pg';
import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const migrationsDir = join(__dirname, '..', 'migrations');

const uri = process.env.NEXT_PUBLIC_DB_URL;
if (!uri) {
    console.error('NEXT_PUBLIC_DB_URL is not defined');
    process.exit(1);
}

const pool = new Pool({
    connectionString: uri,
    ssl: { rejectUnauthorized: false },
});

const files = readdirSync(migrationsDir)
    .filter((f) => f.endsWith('.sql'))
    .sort();

const client = await pool.connect();
try {
    for (const file of files) {
        console.log(`Running migration: ${file}`);
        const sql = readFileSync(join(migrationsDir, file), 'utf8');
        await client.query(sql);
    }
    console.log('Migrations completed successfully.');
} finally {
    client.release();
    await pool.end();
}
