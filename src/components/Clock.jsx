import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'


export default function Clock(){
const [now, setNow] = useState(new Date())
useEffect(()=>{
const t = setInterval(()=> setNow(new Date()), 1000)
return ()=> clearInterval(t)
},[])
return (
<div className="text-right">
<div className="text-3xl font-medium">{format(now,'yyyy-MM-dd HH:mm:ss')}</div>
<div className="text-sm text-gray-500 dark:text-gray-400">{format(now,'EEEE')} · 农历 {'' /* placeholder; lunar lib could be plugged */}</div>
</div>
)
}
