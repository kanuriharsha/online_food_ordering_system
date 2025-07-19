import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup({ onSignupSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    setErr('');
    try {
      const res = await fetch('http://localhost:5050/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg('Signup successful! You can now log in.');
        setUsername('');
        setPassword('');
        setTimeout(() => navigate('/login'), 1000);
        if (onSignupSuccess) onSignupSuccess();
      } else {
        setErr(data.message || 'Signup failed');
      }
    } catch {
      setErr('Server error');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #fff7ed 0%, #fef3c7 100%)'
    }}>
      <form onSubmit={handleSubmit} style={{
        background: '#fff',
        padding: '2.5rem 2rem',
        borderRadius: '1rem',
        boxShadow: '0 4px 24px 0 rgba(234,88,12,0.07)',
        minWidth: 320
      }}>
        <h2 style={{color:'#ea580c', fontWeight:'bold', fontSize:'2rem', marginBottom:'1.5rem', textAlign:'center'}}>Sign Up</h2>
        <div style={{marginBottom:'1rem'}}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e=>setUsername(e.target.value)}
            style={{
              width:'100%',
              padding:'0.7rem 1rem',
              borderRadius:'0.7rem',
              border:'1px solid #f3f4f6',
              marginBottom:'0.7rem',
              fontSize:'1rem'
            }}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e=>setPassword(e.target.value)}
            style={{
              width:'100%',
              padding:'0.7rem 1rem',
              borderRadius:'0.7rem',
              border:'1px solid #f3f4f6',
              fontSize:'1rem'
            }}
            required
          />
        </div>
        {msg && <div style={{color:'#22c55e', marginBottom:'1rem', textAlign:'center'}}>{msg}</div>}
        {err && <div style={{color:'#ef4444', marginBottom:'1rem', textAlign:'center'}}>{err}</div>}
        <button type="submit" style={{
          width:'100%',
          background:'#ea580c',
          color:'#fff',
          border:'none',
          borderRadius:'0.7rem',
          padding:'0.9rem 0',
          fontSize:'1.1rem',
          fontWeight:'600',
          cursor:'pointer',
          transition:'background 0.2s',
          marginBottom: '0.7rem'
        }}>Sign Up</button>
        <button type="button" onClick={() => navigate('/login')} style={{
          width:'100%',
          background:'#fff',
          color:'#ea580c',
          border:'1px solid #ea580c',
          borderRadius:'0.7rem',
          padding:'0.7rem 0',
          fontSize:'1rem',
          fontWeight:'500',
          cursor:'pointer',
          transition:'background 0.2s'
        }}>Go to Login</button>
      </form>
    </div>
  );
}

export default Signup;
