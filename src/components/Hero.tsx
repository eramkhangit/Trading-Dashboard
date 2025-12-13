import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-primary-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Build Amazing
            <span className="text-primary-500"> Digital Experiences</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create beautiful, responsive web applications with modern technologies. 
            Fast, reliable, and scalable solutions for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary-500 hover:bg-primary-600 px-8 py-3 rounded-lg font-semibold text-lg transition-colors duration-200 shadow-lg">
              Get Started Free
            </button>
            <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-lg font-semibold text-lg transition-colors duration-200">
              View Demo
            </button>
          </div>
        </div>

        {/* Hero Image/Illustration */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className=" rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="aspect-video bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-lg font-semibold">Your App Preview</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;