import React, { useState, useEffect } from 'react'
import Clock from './components/Clock'
import Calendar from './components/Calendar'
import Quadrant from './components/Quadrant'
import Login from './components/Login'


export default function App(){
const [user, setUser] = useState(null)
useEffect(()=>{
const raw = localStorage.getItem('mc_user')
if(raw) setUser(JSON.parse(raw))
},[])


return (
<div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
<div className="max-w-5xl mx-auto p-6">
<header className="flex justify-between items-center mb-6">
<Clock />
<div>
{user ? (
<div className="flex items-center gap-3">
<div className="text-sm">{user.display_name || user.email}</div>
<button className="px-3 py-1 rounded bg-brand-500 text-white text-sm" onClick={()=>{localStorage.removeItem('mc_user'); setUser(null)}}>退出</button>
</div>
) : (
<Login onLogin={(u)=>{ setUser(u); localStorage.setItem('mc_user', JSON.stringify(u))}}/>
)}
</div>
</header>


<main className="grid grid-cols-1 md:grid-cols-2 gap-6">
<section className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
<h3 className="text-lg font-semibold mb-2">日历（农历/节气）</h3>
<Calendar user={user} />
</section>


<section className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
<h3 className="text-lg font-semibold mb-2">四象限</h3>
<Quadrant user={user} />
</section>
</main>


</div>
</div>
)
}
