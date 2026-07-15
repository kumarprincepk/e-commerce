import React from 'react';
import { Menu, Search, ShoppingCart, User, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar({ onSearch, searchTerm, onMenuClick }) {
  return (
    <div className="bg-[#2d3748] text-white p-4 flex items-center justify-between shadow-md z-50">
      <div className="flex items-center space-x-4 w-[120px]">
        <Menu className="cursor-pointer md:hidden" onClick={onMenuClick} />
      </div>
      
      <div className="flex-1 flex justify-center max-w-2xl px-4">
        <div className="w-full relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-gray-400 w-5 h-5" />
          </div>
          <input 
            type="text"
            className="w-full bg-white text-gray-800 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => onSearch && onSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center justify-end space-x-6 w-[120px]">
        <ShoppingCart className="cursor-pointer w-5 h-5" />
        <HelpCircle className="cursor-pointer w-5 h-5 hidden sm:block" />
        <User className="cursor-pointer w-5 h-5" />
      </div>
    </div>
  );
}
