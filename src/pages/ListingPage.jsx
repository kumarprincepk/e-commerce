import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductService } from '../services/productService';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';

const ITEMS_PER_PAGE = 8; // Like the mock

export default function ListingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // States for filters
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  
  // Brands from URL (comma separated)
  const initialBrands = searchParams.get('brands') ? searchParams.get('brands').split(',') : [];
  const [selectedBrands, setSelectedBrands] = useState(initialBrands);
  
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page')) || 1);

  // Fetch initial data (all products to allow client-side filtering of everything)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [productsData, categoriesData] = await Promise.all([
          ProductService.getAllProducts(),
          ProductService.getCategories()
        ]);
        
        setProducts(productsData.products);
        setCategories(categoriesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Sync state to URL when applying filters
  const applyFilters = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (selectedCategory) params.set('category', selectedCategory);
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    if (selectedBrands.length > 0) params.set('brands', selectedBrands.join(','));
    params.set('page', '1'); // Reset to page 1 on filter
    setSearchParams(params);
    setCurrentPage(1);
  };

  // When filters change directly that don't need "Apply" button (like category/brands)
  // The instructions mention "Changing a filter should update the product list immediately"
  // So we will sync immediately for all changes except maybe price which has an Apply button in the UI.
  // Actually, I'll sync everything immediately to match "update product list immediately"
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (selectedCategory) params.set('category', selectedCategory);
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    if (selectedBrands.length > 0) params.set('brands', selectedBrands.join(','));
    params.set('page', currentPage.toString());
    setSearchParams(params, { replace: true });
  }, [searchTerm, selectedCategory, minPrice, maxPrice, selectedBrands, currentPage, setSearchParams]);

  // Derived state: Available brands based on current category (or all if none)
  const availableBrands = useMemo(() => {
    const filteredByCat = selectedCategory 
      ? products.filter(p => p.category === selectedCategory)
      : products;
    
    const brands = new Set();
    filteredByCat.forEach(p => {
      if (p.brand) brands.add(p.brand);
    });
    return Array.from(brands).sort();
  }, [products, selectedCategory]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Category match
      if (selectedCategory && p.category !== selectedCategory) return false;
      
      // Brand match
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false;
      
      // Price match
      if (minPrice && p.price < parseFloat(minPrice)) return false;
      if (maxPrice && p.price > parseFloat(maxPrice)) return false;

      // Search match
      if (searchTerm && !p.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      
      return true;
    });
  }, [products, selectedCategory, selectedBrands, minPrice, maxPrice, searchTerm]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  
  // Ensure current page is valid
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCategoryChange = (slug) => {
    setSelectedCategory(slug);
    setSelectedBrands([]); // reset brands when category changes
    setCurrentPage(1);
  };

  const handleBrandChange = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
    setCurrentPage(1);
  };
  
  const handlePriceChange = (type, value) => {
    if (type === 'min') setMinPrice(value);
    if (type === 'max') setMaxPrice(value);
    // don't reset page here yet, wait for apply or let useEffect handle it if we want immediate
    setCurrentPage(1);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  }

  if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="h-screen bg-[#f3f4f6] flex flex-col items-center overflow-hidden">
      <div className="w-full h-full flex flex-col bg-white shadow-xl overflow-hidden relative">
        <Navbar 
          onSearch={handleSearch} 
          searchTerm={searchTerm} 
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} 
        />
        
        <div className="flex flex-1 overflow-hidden border-t border-gray-200 mx-0 sm:mx-4">
          <div className={`${isSidebarOpen ? 'block' : 'hidden'} md:block absolute md:relative z-40 h-full bg-white md:bg-transparent shadow-lg md:shadow-none w-64 flex-shrink-0`}>
            <Sidebar 
              categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onPriceChange={handlePriceChange}
            brands={availableBrands}
            selectedBrands={selectedBrands}
            onBrandChange={handleBrandChange}
            applyFilters={() => {
              applyFilters();
              setIsSidebarOpen(false); // close sidebar on mobile after applying
            }}
          />
          </div>
          
          {/* Overlay for mobile sidebar */}
          {isSidebarOpen && (
            <div 
              className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          <div className="flex-1 bg-white p-4 sm:p-6 overflow-y-auto w-full">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center text-gray-500 mt-12">No products found matching your filters.</div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {currentProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                <Pagination 
                  currentPage={currentPage} 
                  totalPages={totalPages} 
                  onPageChange={(page) => {
                    setCurrentPage(page);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }} 
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
