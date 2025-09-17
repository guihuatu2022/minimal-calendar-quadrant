/*
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


if (request.method === 'POST' && path === '/login') {
const body = await request.json();
const { email, password } = body;
if (!email || !password) return new Response(JSON.stringify({ error: 'missing' }), { status: 400 });
const hash = btoa(password);
const row = await env.DB.prepare('SELECT id,email,password_hash,display_name FROM users WHERE email = ?').bind(email).first();
if (!row) return new Response(JSON.stringify({ error: 'invalid' }), { status: 401 });
if (row.password_hash !== hash) return new Response(JSON.stringify({ error: 'invalid' }), { status: 401 });
const token = sign({ sub: row.id, email: row.email }, SECRET);
return new Response(JSON.stringify({ token, user: { id: row.id, email: row.email, display_name: row.display_name } }), { status: 200 });
}


if (path === '/events' && request.method === 'GET') {
const user_id = url.searchParams.get('user_id');
if (!user_id) return new Response(JSON.stringify({ error: 'user_id missing' }), { status: 400 });
const list = await env.DB.prepare('SELECT * FROM events WHERE user_id = ? ORDER BY start_at DESC').bind(user_id).all();
return new Response(JSON.stringify({ events: list.results || [] }), { status: 200 });
}


if (path === '/events' && request.method === 'POST') {
const body = await request.json();
const { user_id, title, quadrant, start_at, end_at } = body;
const res = await env.DB.prepare('INSERT INTO events (user_id, title, quadrant, start_at, end_at) VALUES (?, ?, ?, ?, ?)').bind(user_id, title, quadrant || 0, start_at || null, end_at || null).run();
return new Response(JSON.stringify({ ok: true, id: res.lastRowId }), { status: 201 });
}


return new Response(JSON.stringify({ error: 'not found' }), { status: 404 });
}
