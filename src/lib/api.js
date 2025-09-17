const API_BASE = '/api'
export async function signup(payload){
const r = await fetch(API_BASE + '/signup', { method: 'POST', headers:{'content-type':'application/json'}, body: JSON.stringify(payload) })
return r.json()
}
export async function login(payload){
const r = await fetch(API_BASE + '/login', { method: 'POST', headers:{'content-type':'application/json'}, body: JSON.stringify(payload) })
return r.json()
}
export async function fetchEvents(user_id){
const r = await fetch(API_BASE + '/events?user_id=' + encodeURIComponent(user_id))
return r.json()
}
export async function createEvent(payload){
const r = await fetch(API_BASE + '/events', { method: 'POST', headers:{'content-type':'application/json'}, body: JSON.stringify(payload) })
return r.json()
}
