import React, { useState } from 'react'
import { signup, login } from '../lib/api'


export default function Login({ onLogin }){
const [email,setEmail]=useState('')
const [password,setPassword]=useState('')
async function doSignup(){
await signup({ email, password })
alert('注册成功，请登录')
}
async function doLogin(){
const res = await login({ email, password })
if(res.token){ onLogin(res.user) }
else alert('登录失败')
}
return (
<div className="flex items-center gap-2">
<input placeholder="邮箱" value={email} onChange={(e)=>setEmail(e.target.value)} className="px-2 py-1 rounded border text-sm" />
<input placeholder="密码" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="px-2 py-1 rounded border text-sm" />
<button onClick={doLogin} className="px-3 py-1 rounded bg-brand-500 text-white text-sm">登录</button>
<button onClick={doSignup} className="px-3 py-1 rounded border text-sm">注册</button>
</div>
)
}
