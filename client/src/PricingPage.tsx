import React from 'react';

interface Package {
  id: string;
  name: string;
  price: string;
}

const packages: Package[] = [
  { id: 'basic', name: 'Basic Package', price: '$50' },
  { id: 'standard', name: 'Standard Package', price: '$100' },
  { id: 'premium', name: 'Premium Package', price: '$200' },
];

const PricingPage: React.FC = () => {
  const handleBuy = async (packageId: string) => {
    try {
      const response = await fetch('/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packageId }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Error creating checkout session');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 animate__animated animate__fadeInDown">
        Our Software Development Packages
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {packages.map((pkg, index) => (
          <div
            key={pkg.id}
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center animate__animated animate__fadeInUp"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <h2 className="text-2xl font-semibold mb-2">{pkg.name}</h2>
            <p className="text-xl text-gray-700 mb-4">{pkg.price}</p>
            <button
              onClick={() => handleBuy(pkg.id)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
