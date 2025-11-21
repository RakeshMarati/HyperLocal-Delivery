import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMerchants } from '../store/thunks/merchantThunks';
import { setFilters, clearFilters } from '../store/slices/merchantSlice';
import MerchantList from '../components/merchant/MerchantList/MerchantList';
import Button from '../components/common/Button/Button';

const MerchantListPage = () => {
  const dispatch = useDispatch();
  const { merchants, isLoading, error, filters } = useSelector((state) => state.merchants);
  const { address } = useSelector((state) => state.location);

  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  const [selectedCategory, setSelectedCategory] = useState(filters.category || '');

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'food', label: 'Food' },
    { value: 'grocery', label: 'Grocery' },
    { value: 'pharmacy', label: 'Pharmacy' },
    { value: 'others', label: 'Others' },
  ];

  useEffect(() => {
    // Fetch merchants on component mount and when filters change
    const currentFilters = {
      category: selectedCategory || null,
      city: address?.city || null,
      search: searchTerm || null,
    };

    dispatch(setFilters(currentFilters));
    dispatch(fetchMerchants(currentFilters));
  }, [dispatch, selectedCategory, address, searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    const currentFilters = {
      category: selectedCategory || null,
      city: address?.city || null,
      search: searchTerm || null,
    };
    dispatch(setFilters(currentFilters));
    dispatch(fetchMerchants(currentFilters));
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    dispatch(clearFilters());
    dispatch(fetchMerchants({ city: address?.city || null }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Browse Merchants
          </h1>
          {address ? (
            <p className="text-gray-600">
              Showing merchants in{' '}
              <span className="font-medium">
                {address.city}
                {address.state && `, ${address.state}`}
              </span>
            </p>
          ) : (
            <p className="text-yellow-600 text-sm">
              ⚠️ Set your location to see nearby merchants
            </p>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Search
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search merchants..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-end space-x-2">
                <Button type="submit" variant="primary" size="md" className="flex-1">
                  Search
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="md"
                  onClick={handleClearFilters}
                >
                  Clear
                </Button>
              </div>
            </div>
          </form>
        </div>

        {/* Merchant List */}
        <MerchantList merchants={merchants} isLoading={isLoading} error={error} />
      </div>
    </div>
  );
};

export default MerchantListPage;

