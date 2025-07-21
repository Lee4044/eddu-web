import React from 'react';

function Profile() {
  return (
    <div style={{ padding: '2rem', maxWidth: '700px', margin: 'auto' }}>
      <h1>Profile</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Profile" style={{ width: '120px', borderRadius: '50%' }} />
        <div>
          <h2>Kevin Gilbert</h2>
          <p>Web Designer & Best-Selling Instructor</p>
          <p>Enrolled Courses: 957</p>
          <p>Completed Courses: 951</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
