import React from 'react';

function Courses() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>My Courses</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
        {/* Example courses */}
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1rem', width: '220px' }}>
          <img src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2" alt="Course" style={{ width: '100%', borderRadius: '6px' }} />
          <h3>Complete Blender Creator</h3>
          <p>18.00 USD</p>
        </div>
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1rem', width: '220px' }}>
          <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40" alt="Course" style={{ width: '100%', borderRadius: '6px' }} />
          <h3>SQL for NEWBS</h3>
          <p>13.00 USD</p>
        </div>
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1rem', width: '220px' }}>
          <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca" alt="Course" style={{ width: '100%', borderRadius: '6px' }} />
          <h3>Python Bootcamp</h3>
          <p>16.00 USD</p>
        </div>
      </div>
    </div>
  );
}

export default Courses;
