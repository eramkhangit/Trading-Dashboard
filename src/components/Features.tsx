import React from 'react';

interface Feature {
  name: string;
  description: string;
  icon: string;
}

const Features: React.FC = () => {
  const features: Feature[] = [
    {
      name: 'Fast Performance',
      description: 'Lightning-fast load times and smooth interactions for your users.',
      icon: '⚡',
    },
    {
      name: 'Secure',
      description: 'Enterprise-grade security to protect your data and privacy.',
      icon: '🔒',
    },
    {
      name: 'Easy to Use',
      description: 'Intuitive interface that makes development a pleasure.',
      icon: '🎯',
    },
    {
      name: '24/7 Support',
      description: 'Round-the-clock support from our dedicated team.',
      icon: '🛟',
    },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful features to help you build, deploy, and scale your applications with ease.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, _index) => (
            <div
              key={feature.name}
              className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300 border border-gray-100"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.name}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;