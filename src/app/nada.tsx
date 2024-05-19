'use client';

import Image from "next/image";

export default function page() {

  async function handleLogin() {
    const res = await fetch('/api/auth/admin/login', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        "email": "admin@tdn.com",
        "password": "admin123"
        // "email": "test@tdn.com",
        // "password": "test"
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    alert(JSON.stringify(data))
  }
  async function handleLoginUser() {
    const res = await fetch('/api/auth/user/login', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        "email": "mauro.venticinque@hotmail.com",
        "password": "mauro1234"
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    alert(JSON.stringify(data))
  }

  async function handleLogout() {
    const res = await fetch('/api/auth/admin/logout', {
      method: "DELETE",
      credentials: 'include'
    })
    const data = await res.json()
    alert(JSON.stringify(data))
  }
  async function handleLogoutUser() {
    const res = await fetch('/api/auth/user/logout', {
      method: "DELETE",
      credentials: 'include'
    })
    const data = await res.json()
    alert(JSON.stringify(data))
  }

  async function handleProfile() {
    const res = await fetch('/api/auth/admin/profile', {
      method: "GET",
      credentials: 'include'
    })
    const data = await res.json()
    alert(JSON.stringify(data))
  }
  async function handleProfileUser() {
    const res = await fetch('/api/auth/user/profile', {
      method: "GET",
      credentials: 'include'
    })
    const data = await res.json()
    alert(JSON.stringify(data))
  }

  async function handleSignin() {
    const res = await fetch('/api/auth/admin/signin', {
      method: "POST",
      credentials: 'include',
      body: JSON.stringify({
        email: "testa2@testa.com",
        password: "123456",
        fullname: "Testa Testa"
      })
    })
    const data = await res.json()
    alert(JSON.stringify(data))
  }
  async function handleResetPassword() {
    const res = await fetch('/api/auth/user/reset-password', {
      method: "POST",
      credentials: 'include',
      body: JSON.stringify({
        email: "mauro.venticinque@hotmail.com",
      })
    })
    const data = await res.json()
    alert(JSON.stringify(data))
  }

  {/* <a href="/" className="block mt-5">Inicio</a>
  <a href="/dashboard" className="block mt-5">Dashboard</a>
  <button onClick={handleLogin} className="block px-3 py-2 rounded bg-emerald-500 mt-5">Login ADMIN</button>
  <button onClick={handleLoginUser} className="block px-3 py-2 rounded bg-emerald-500 mt-5">Login USER</button>
  <button onClick={handleLogout} className="block px-3 py-2 rounded bg-red-500 mt-5">Logout ADMIN</button>
  <button onClick={handleLogoutUser} className="block px-3 py-2 rounded bg-red-500 mt-5">Logout User</button>
  <button onClick={handleProfile} className="block px-3 py-2 rounded bg-blue-500 mt-5">Profile ADMIN</button>
  <button onClick={handleProfileUser} className="block px-3 py-2 rounded bg-blue-500 mt-5">Profile USER</button>
  <button onClick={handleSignin} className="block px-3 py-2 rounded bg-yellow-500 mt-5">Signin ADMIN</button>
  <button onClick={handleResetPassword} className="block px-3 py-2 rounded bg-white-500 mt-5">RESET PASS USER</button> */}
  return (
    <main>
      <div className="bg-white min-h-screen flex flex-col items-center justify-center">
        <a href="/dashboard" className="block mb-5 text-blue-600 underline">Ir al panel de administrador</a>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Sitio en Construcción</h1>
        <p className="text-gray-600 mb-6">Estamos trabajando en mejorar su experiencia. <br />Regresaremos pronto.</p>
        <Image src="/portada-dashboard.png" width={1080} height={607} priority className="" alt="Sitio en construcción" />
      </div>
    </main>
  )
}