import React, { useState } from 'react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  available: boolean;
  imageUrl: string; 
}

const ProductCard: React.FC<{ product: Product, onAddToOrder: (product: Product) => void }> = ({ product, onAddToOrder }) => {
  const [isAvailable, setIsAvailable] = useState(product.available);

  
  const toggleAvailability = () => {
    setIsAvailable((prev) => !prev);  
  };

  return (
    <div className="border-4 border-orange-200 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all ease-in-out transform hover:scale-105 bg-gradient-to-r from-white via-orange-100 to-white relative mt-4 mx-4 w-full sm:w-1/2 md:w-1/2 lg:w-1/2">

      <div className="flex items-center">
        
        <div className="w-2/3 pr-4">
          <h3 className="text-xl font-medium text-black">{product.name}</h3>
          <p className="text-sm text-gray-600">{product.description}</p>
          <p className="mt-2 font-semibold text-black">${product.price.toFixed(2)}</p>

          
          <div className="mt-4 flex items-center">
            <div className={`flex items-center ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
              <span className="text-sm font-medium">{isAvailable ? 'Available' : 'Not Available'}</span>
              <button
                onClick={toggleAvailability}
                className={`ml-2 p-1 rounded-full transition-all duration-300 ${isAvailable ? 'bg-green-200' : 'bg-red-200'}`}
              >
                <span
                  className={`block w-6 h-6 rounded-full transition-all duration-300 transform ${isAvailable ? 'translate-x-4' : ''} bg-white`}
                ></span>
              </button>
            </div>
          </div>

          
          {isAvailable && (
            <button
              className="mt-4 bg-orange-500 text-white p-2 rounded-full w-14 h-14 flex justify-center items-center transition-all duration-300 transform hover:scale-110 shadow-md"
              onClick={() => onAddToOrder(product)}  
            >
              <span className="text-3xl font-bold">+</span>
            </button>
          )}
        </div>

        
        <div className="w-1/3">
          <img
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-50 object-cover rounded-lg" 
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
