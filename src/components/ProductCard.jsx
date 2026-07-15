import React from 'react';
import { Star, StarHalf } from 'lucide-react';
import { Link } from 'react-router-dom';

const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <div key={i} className="relative w-4 h-4">
          <Star className="w-4 h-4 text-gray-300 absolute" />
          <StarHalf className="w-4 h-4 fill-yellow-400 text-yellow-400 absolute" />
        </div>
      );
    } else {
      stars.push(<Star key={i} className="w-4 h-4 text-gray-300 fill-gray-300" />);
    }
  }
  return stars;
};

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="bg-white rounded-lg p-4 border border-gray-100 hover:shadow-lg transition-shadow flex flex-col">
      <div className="flex-1 flex justify-center items-center mb-4 min-h-[200px]">
        <img 
          src={product.thumbnail} 
          alt={product.title} 
          className="max-h-[200px] object-contain"
        />
      </div>
      <div className="mt-auto">
        <h3 className="font-semibold text-gray-800 text-lg line-clamp-1 mb-2">{product.title}</h3>
        <div className="flex items-center space-x-2">
          <span className="font-bold text-xl">${product.price}</span>
          <div className="flex items-center space-x-1">
            {renderStars(product.rating)}
          </div>
          <span className="text-gray-500 text-sm">({product.rating.toFixed(1)})</span>
        </div>
      </div>
    </Link>
  );
}
