import React from 'react'


export default function Calendar({ user }){
return (
<div className="select-none">
{/* Simple month grid stub. For MVP, we show a calendar grid and allow clicking a day to add an event. */}
<div className="grid grid-cols-7 gap-1 text-sm">
{['日','一','二','三','四','五','六'].map(d=> (
<div key={d} className="text-center font-medium py-1">{d}</div>
))}
{Array.from({length: 35}).map((_,i)=> (
<div key={i} className="border rounded p-2 h-20 bg-gray-50 dark:bg-gray-700 flex flex-col justify-between">
<div className="text-xs text-gray-500">{i+1}</div>
<div className="text-xs">{/* events list placeholder*/}</div>
</div>
))}
</div>
</div>
)
}
