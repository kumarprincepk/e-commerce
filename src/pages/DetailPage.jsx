import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, StarHalf } from 'lucide-react';
import { ProductService } from '../services/productService';
import Navbar from '../components/Navbar';

const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />);
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <div key={i} className="relative w-5 h-5">
          <Star className="w-5 h-5 text-gray-300 absolute" />
          <StarHalf className="w-5 h-5 fill-yellow-400 text-yellow-400 absolute" />
        </div>
      );
    } else {
      stars.push(<Star key={i} className="w-5 h-5 text-gray-300 fill-gray-300" />);
    }
  }
  return stars;
};

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await ProductService.getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);

  if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="h-screen bg-[#f3f4f6] flex flex-col items-center overflow-hidden">
      <div className="w-full h-full flex flex-col bg-white shadow-xl overflow-hidden">
        <Navbar />
        
        <div className="flex-1 bg-white p-8 overflow-y-auto">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors mb-8 text-gray-700 font-medium w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : product ? (
            <div className="flex flex-col md:flex-row gap-12">
              <div className="md:w-1/2 flex justify-center items-start">
                <img 
                  src={product.thumbnail} 
                  alt={product.title} 
                  className="w-full max-w-md object-contain rounded-lg"
                />
              </div>
              
              <div className="md:w-1/2 flex flex-col">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                  <div className="flex items-center space-x-1">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-gray-500 text-sm">({product.rating.toFixed(1)})</span>
                </div>
                
                <div className="space-y-4 mb-8">
                  {product.brand && (
                    <div className="flex items-center">
                      <span className="font-semibold text-gray-900 w-24">Brand:</span>
                      <span className="text-gray-600">{product.brand}</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-900 w-24">Category:</span>
                    <span className="text-gray-600 capitalize">{product.category}</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Description</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {product.reviews && product.reviews.length > 0 && (
                  <div className="border-t border-gray-200 pt-6 mt-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Reviews</h3>
                    <div className="space-y-6">
                      {product.reviews.map((review, index) => (
                        <div key={index} className="flex flex-col">
                          <div className="flex items-center space-x-4 mb-2">
                            <span className="font-semibold text-gray-900">{review.reviewerName}</span>
                            <div className="flex items-center space-x-1">
                              {renderStars(review.rating)}
                            </div>
                            <span className="text-gray-500 text-sm">({review.rating.toFixed(1)})</span>
                          </div>
                          <p className="text-gray-600">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
