import React from 'react';
import './About.scss';

const About: React.FC = () => {
  return (
    <div className="about-page">
      <h1>About Us</h1>
      <p>This page demonstrates React Router DOM navigation and SASS styling.</p>
      <div className="about-content">
        <h2>Project Features</h2>
        <ul>
          <li>Vite for fast development and building</li>
          <li>React 18 with TypeScript for type safety</li>
          <li>React Router DOM for client-side routing</li>
          <li>SASS for advanced CSS features</li>
          <li>Modern project structure</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
