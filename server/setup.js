import { readFile } from 'node:fs/promises';
import pg from 'pg';
import { makeSeeds } from './store.js';
if(!process.env.DATABASE_URL)throw new Error('DATABASE_URL is required');
const pool=new pg.Pool({connectionString:process.env.DATABASE_URL});
const client=await pool.connect();
try{await client.query('BEGIN');await client.query(await readFile(new URL('../sql/schema.sql',import.meta.url),'utf8'));for(const [entity,rows] of Object.entries(makeSeeds()))for(const {id,createdAt,updatedAt,...payload} of rows)await client.query('INSERT INTO records(id,entity,payload,created_at,updated_at) VALUES($1,$2,$3,$4,$5) ON CONFLICT(id) DO NOTHING',[id,entity,payload,createdAt,updatedAt]);await client.query('COMMIT');console.log('Schema ready; synthetic seeds inserted without overwriting existing rows.')}catch(e){await client.query('ROLLBACK');throw e}finally{client.release();await pool.end()}
