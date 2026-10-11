import { createApp } from './app.js';
import { memoryStore,postgresStore } from './store.js';
const demo=process.env.DEMO_MODE==='true';
if(!demo&&!process.env.DATABASE_URL){console.error('Set DATABASE_URL for PostgreSQL, or DEMO_MODE=true for ephemeral demo data.');process.exit(1)}
const store=demo?memoryStore():postgresStore(process.env.DATABASE_URL);
const server=createApp(store).listen(Number(process.env.PORT)||3001,'127.0.0.1',()=>console.log(`API running on http://127.0.0.1:${Number(process.env.PORT)||3001} (${store.mode})`));
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>server.close(async()=>{await store.close();process.exit(0)}));
