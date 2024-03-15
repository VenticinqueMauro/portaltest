'use client';

export default function page() {

  async function handleLogin() {
    const res = await fetch('/api/admin-auth/login', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        "email": "test@test.com",
        "password": "123456",
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    alert(JSON.stringify(data))
  }

  async function handleLogout() {
    const res = await fetch('/api/admin-auth/logout', {
      method: "DELETE",
      credentials: 'include'
    })
    const data = await res.json()
    console.log(data)
  }

  async function handleProfile() {
    const res = await fetch('/api/admin-auth/profile', {
      method: "GET",
      credentials: 'include'
    })
    const data = await res.json()
    alert(JSON.stringify(data))
  }

  return (
    <main>
      <a href="/" className="block mt-5">Inicio</a>
      <a href="/dashboard" className="block mt-5">Dashboard</a>
      <button onClick={handleLogin} className="block px-3 py-2 rounded bg-emerald-500 mt-5">Login</button>
      <button onClick={handleLogout} className="block px-3 py-2 rounded bg-red-500 mt-5">Logout</button>
      <button onClick={handleProfile} className="block px-3 py-2 rounded bg-blue-500 mt-5">Profile</button>
    </main>
  )
}
