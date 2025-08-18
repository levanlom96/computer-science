import React from 'react';
import './Home.scss';

const Home: React.FC = () => {
  return (
    <div className="home-page">
      <h1>Welcome to the Home Page</h1>
      <p>This is a React TypeScript application with Vite, React Router, and SASS!</p>
      <div className="features">
        <div className="feature-card">
          <h3>⚡ Vite</h3>
          <p>Lightning fast build tool</p>
        </div>
        <div className="feature-card">
          <h3>⚛️ React + TypeScript</h3>
          <p>Type-safe React development</p>
        </div>
        <div className="feature-card">
          <h3>🎨 SASS</h3>
          <p>Powerful CSS preprocessor</p>
        </div>
        <div className="feature-card">
          <h3>🧭 React Router</h3>
          <p>Client-side routing</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
