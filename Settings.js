import React from 'react';

function Settings() {
  return (
    <div style={{ padding: '2rem', maxWidth: '700px', margin: 'auto' }}>
      <h1>Settings</h1>
      <form>
        <label>Full Name</label>
        <input type="text" placeholder="Enter your name" style={{ width: '100%', marginBottom: '1rem' }} />
        <label>Username</label>
        <input type="text" placeholder="Enter your username" style={{ width: '100%', marginBottom: '1rem' }} />
        <label>Phone Number</label>
        <input type="text" placeholder="Enter your phone number" style={{ width: '100%', marginBottom: '1rem' }} />
        <label>Title</label>
        <input type="text" placeholder="Your title" style={{ width: '100%', marginBottom: '1rem' }} />
        <label>Biography</label>
        <textarea placeholder="Your biography" style={{ width: '100%', marginBottom: '1rem' }} />
        <button type="submit" style={{ background: '#1976d2', color: '#fff', padding: '0.5rem 1.5rem', border: 'none', borderRadius: '4px' }}>Save Changes</button>
      </form>
    </div>
  );
}

export default Settings;
