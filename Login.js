import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add authentication logic here
    alert('Logged in as ' + email);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '2rem', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', marginBottom: '1rem' }} />
        <label>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', marginBottom: '1rem' }} />
        <button type="submit" style={{ background: '#1976d2', color: '#fff', padding: '0.5rem 1.5rem', border: 'none', borderRadius: '4px' }}>Login</button>
      </form>
      <p style={{ marginTop: '1rem' }}>Don't have an account? <a href="/signup">Sign up</a></p>
    </div>
  );
}

export default Login;
