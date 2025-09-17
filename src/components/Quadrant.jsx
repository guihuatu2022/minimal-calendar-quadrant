import React, { useEffect, useState } from 'react'
import { fetchEvents, createEvent } from '../lib/api'


export default function Quadrant({ user }){
const [events, setEvents] = useState([])
const [title, setTitle] = useState('')
const [quad, setQuad] = useState(1)


useEffect(()=>{
if(user) load()
},[user])
async function load(){
const res = await fetchEvents(user.id)
setEvents(res.events || [])
}
async function add(){
if(!user) return alert('请先登录')
await createEvent({ user_id: user.id, title, quadrant: quad })
setTitle('')
load()
}


function listBy(q){
return events.filter(e=> (e.quadrant||0) === q)
}


return (
<div>
<div className="grid grid-cols-2 gap-2">
{[1,2,3,4].map(q=> (
<div key={q} className="p-3 bg-gray-100 dark:bg-gray-700 rounded min-h-[140px]">
<div className="text-sm font-semibold mb-2">{q===1? '重要且紧急': q===2? '重要不紧急': q===3? '紧急不重要':'不紧急不重要'}</div>
<ul className="text-sm space-y-1">
{listBy(q).map(ev=> (<li key={ev.id} className="rounded px-2 py-1 bg-white dark:bg-gray-800">{ev.title}</li>))}
</ul>
</div>
))}
</div>


<div className="mt-4 flex gap-2">
<input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="快速添加任务" className="flex-1 p-2 rounded border" />
<select value={quad} onChange={(e)=>setQuad(Number(e.target.value))} className="p-2 rounded border">
<option value={1}>重要且紧急</option>
<option value={2}>重要不紧急</option>
<option value={3}>紧急不重要</option>
<option value={4}>不紧急不重要</option>
</select>
<button onClick={add} className="px-3 py-2 rounded bg-brand-500 text-white">添加</button>
</div>
</div>
)
}
