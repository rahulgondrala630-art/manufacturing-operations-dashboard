import { domain } from '../domain.js';
export function validateRecord(entity,input){
 const fail=m=>{throw Object.assign(new Error(m),{status:400})};
 if(!input || typeof input!=='object' || Array.isArray(input))fail('A record object is required');
 const primary=entity===domain.primary;const fields=primary?domain.fields:domain.secondaryFields;const statuses=primary?domain.statuses:domain.secondaryStatuses;
 const text=(value,label,max=160)=>{if(typeof value!=='string' || !value.trim() || value.length>max)fail(`${label} must be 1–${max} characters`);return value.trim()};
 const result={title:text(input.title,'Title'),status:input.status};if(!statuses.includes(input.status))fail('Select a valid status');
 for(const [key,label,type] of fields){if(type==='number'){if(typeof input[key]!=='number'||!Number.isFinite(input[key])||input[key]<0||input[key]>10000000)fail(`${label} must be a number between 0 and 10000000`);result[key]=input[key]}else if(type==='date'){const v=text(input[key],label,10);if(!/^\d{4}-\d{2}-\d{2}$/.test(v)||!Number.isFinite(new Date(v+'T00:00:00Z').getTime())||new Date(v+'T00:00:00Z').toISOString().slice(0,10)!==v)fail(`${label} must be a valid YYYY-MM-DD date`);result[key]=v}else result[key]=text(input[key],label,300)}
 if(primary){if(typeof input.relationId!=='string'||!input.relationId||input.relationId.length>100)fail('Select a linked group');result.relationId=input.relationId}
 return result;
}
