import React from 'react';
import { Search } from 'lucide-react';

export default function Sidebar({
  categories,
  selectedCategory,
  onCategoryChange,
  minPrice,
  maxPrice,
  onPriceChange,
  brands,
  selectedBrands,
  onBrandChange,
  applyFilters
}) {
  return (
    <div className="w-64 h-full overflow-y-auto flex-shrink-0 bg-[#f9fafb] p-4 border-r border-gray-200 md:border-none">
      <div className="flex items-center space-x-2 text-gray-800 font-semibold text-lg mb-6">
        <Search className="w-5 h-5" />
        <span>Filters</span>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h3 className="font-semibold text-gray-800 mb-3">Categories</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {/* Add 'All' category option */}
          <label className="flex items-center space-x-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked={!selectedCategory} 
              onChange={() => onCategoryChange('')} 
              className="rounded text-blue-500 focus:ring-blue-500" 
            />
            <span className="text-gray-700">All</span>
          </label>
          {categories.map((cat) => (
            <label key={cat.slug} className="flex items-center space-x-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={selectedCategory === cat.slug} 
                onChange={() => onCategoryChange(cat.slug)} 
                className="rounded text-blue-500 focus:ring-blue-500" 
              />
              <span className="text-gray-700 capitalize">{cat.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <h3 className="font-semibold text-gray-800 mb-3">Price Range</h3>
        <div className="flex items-center space-x-2 mb-3">
          <input 
            type="number" 
            placeholder="Min" 
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={minPrice}
            onChange={(e) => onPriceChange('min', e.target.value)}
          />
          <input 
            type="number" 
            placeholder="Max" 
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={maxPrice}
            onChange={(e) => onPriceChange('max', e.target.value)}
          />
        </div>
        <button 
          onClick={applyFilters}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded transition-colors"
        >
          Apply
        </button>
      </div>

      {/* Brands */}
      <div>
        <h3 className="font-semibold text-gray-800 mb-3">Brands</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center space-x-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={selectedBrands.includes(brand)} 
                onChange={() => onBrandChange(brand)} 
                className="rounded text-blue-500 focus:ring-blue-500" 
              />
              <span className="text-gray-700">{brand}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
