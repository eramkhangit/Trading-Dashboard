import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';


const HomePage: React.FC = () => {

  return (
    <div className="min-h-screen bg-white">
      <main>
        <Hero />
        <Features />
       
      </main>
      
    </div>
  );
};

export default HomePage;