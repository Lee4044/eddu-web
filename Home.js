import React from 'react';

function Home() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to E-tutor</h1>
      <h2>Recommended Courses</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
        {/* Example recommended courses */}
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1rem', width: '220px' }}>
          <img src="https://images.unsplash.com/photo-1513258496099-48168024aec0" alt="Course" style={{ width: '100%', borderRadius: '6px' }} />
          <h3>Learn Python Programming</h3>
          <p>Master Python from scratch. 49.00 USD</p>
        </div>
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1rem', width: '220px' }}>
          <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6" alt="Course" style={{ width: '100%', borderRadius: '6px' }} />
          <h3>Graphic Design Masterclass</h3>
          <p>Learn GREAT Design. 89.00 USD</p>
        </div>
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1rem', width: '220px' }}>
          <img src="https://images.unsplash.com/photo-1503676382389-4809596d5290" alt="Course" style={{ width: '100%', borderRadius: '6px' }} />
          <h3>Machine Learning A-Z</h3>
          <p>Hands-On Data Science. 9.00 USD</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
