import express from 'express';
import cors from 'cors';
import { domain } from '../domain.js';
import { validateRecord } from './validation.js';
export function createApp(store) {
 const app=express(); app.disable('x-powered-by'); app.use(cors({origin:process.env.CLIENT_ORIGIN || 'http://localhost:5173'})); app.use(express.json({limit:'32kb'}));
 app.get('/api/health',(_,res)=>res.json({status:'ok',storage:store.mode,app:domain.brand}));
 app.get('/api/:entity',async(req,res,next)=>{try { checkEntity(req.params.entity); res.json(await store.list(req.params.entity)); }catch(e){next(e)}});
 app.post('/api/:entity',async(req,res,next)=>{try{checkEntity(req.params.entity);const value=validateRecord(req.params.entity,req.body);await checkRelation(store,req.params.entity,value);res.status(201).json(await store.create(req.params.entity,value));}catch(e){next(e)}});
 app.put('/api/:entity/:id',async(req,res,next)=>{try{checkEntity(req.params.entity);const value=validateRecord(req.params.entity,req.body);await checkRelation(store,req.params.entity,value);const row=await store.update(req.params.entity,req.params.id,value);if(!row)throw problem(404,'Record not found');res.json(row);}catch(e){next(e)}});
 app.delete('/api/:entity/:id',async(req,res,next)=>{try{checkEntity(req.params.entity);if(req.params.entity===domain.secondary && (await store.list(domain.primary)).some(r=>r.relationId===req.params.id))throw problem(409,'Remove or reassign linked records before deleting this group');if(!await store.remove(req.params.entity,req.params.id))throw problem(404,'Record not found');res.status(204).end();}catch(e){next(e)}});
 app.use((err,req,res,next)=>{const status=err.status || (err.type==='entity.parse.failed'?400:500);if(status===500)console.error(err);res.status(status).json({error:status===500?'Unexpected server error':err.message});});return app;
}
function checkEntity(entity){if(![domain.primary,domain.secondary].includes(entity))throw problem(404,'Unknown resource')}
async function checkRelation(store,entity,value){if(entity===domain.primary && value.relationId && !(await store.list(domain.secondary)).some(r=>r.id===value.relationId))throw problem(400,'Linked group does not exist')}
export function problem(status,message){return Object.assign(new Error(message),{status})}
