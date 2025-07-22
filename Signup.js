import React, { useState } from 'react';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add registration logic here
    alert('Account created for ' + name);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '2rem', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} required style={{ width: '100%', marginBottom: '1rem' }} />
        <label>Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', marginBottom: '1rem' }} />
        <label>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', marginBottom: '1rem' }} />
        <button type="submit" style={{ background: '#1976d2', color: '#fff', padding: '0.5rem 1.5rem', border: 'none', borderRadius: '4px' }}>Sign Up</button>
      </form>
      <p style={{ marginTop: '1rem' }}>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
}

export default Signup;
