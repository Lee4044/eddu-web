import React from 'react';

function Dashboard() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Student Dashboard</h1>
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <div style={{ background: '#e3f2fd', padding: '1rem', borderRadius: '8px', minWidth: '200px' }}>
          <h2>Enrolled Courses</h2>
          <p>957</p>
        </div>
        <div style={{ background: '#e3f2fd', padding: '1rem', borderRadius: '8px', minWidth: '200px' }}>
          <h2>Completed Courses</h2>
          <p>951</p>
        </div>
        <div style={{ background: '#e3f2fd', padding: '1rem', borderRadius: '8px', minWidth: '200px' }}>
          <h2>Course Instructors</h2>
          <p>241</p>
        </div>
      </div>
      <div style={{ marginTop: '2rem' }}>
        <h2>Recent Activity</h2>
        <ul>
          <li>Kevin commented on your lecture.</li>
          <li>John gave a 5 star rating on your course.</li>
          <li>Snober purchased your course.</li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
