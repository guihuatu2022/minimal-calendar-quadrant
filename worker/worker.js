/*
Simple Cloudflare Worker (modules) example for auth and events.
Bind a D1 database with the name "DB" in Worker settings.
This worker exposes simple JSON endpoints:
POST /api/signup { email, password, display_name }
POST /api/login { email, password }
GET /api/events (requires ?user_id=)
POST /api/events { user_id, title, quadrant, start_at }
NOTE: This is minimal for MVP. Use secure password hashing in prod.
*/


import { sign, verify } from 'https://jspm.dev/jwt-encode';


const SECRET = 'change_this_to_a_strong_secret';


export default {
async fetch(request, env) {
const url = new URL(request.url);
if (url.pathname.startsWith('/api/')) {
try {
return await handleApi(request, env);
} catch (err) {
return new Response(JSON.stringify({ error: err.message }), { status: 500 });
}
}
return fetch(request);
}
}


async function handleApi(request, env) {
const url = new URL(request.url);
const path = url.pathname.replace('/api','');
if (request.method === 'POST' && path === '/signup') {
const body = await request.json();
const { email, password, display_name } = body;
if (!email || !password) return new Response(JSON.stringify({ error: 'missing' }), { status: 400 });
// WARNING: placeholder hashing, replace with secure hash in production
const hash = btoa(password);
const res = await env.DB.prepare('INSERT INTO users (email, password_hash, display_name) VALUES (?, ?, ?)').bind(email, hash, display_name || null).run();
return new Response(JSON.stringify({ ok: true, id: res.lastRowId }), { status: 201 });
}


}
