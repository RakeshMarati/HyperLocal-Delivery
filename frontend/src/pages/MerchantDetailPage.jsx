import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMerchantById } from '../store/thunks/merchantThunks';
import { fetchProductsByMerchant } from '../store/thunks/productThunks';
import ProductList from '../components/product/ProductList/ProductList';

const MerchantDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedMerchant, isLoading: merchantLoading } = useSelector(
    (state) => state.merchants
  );
  const { products, isLoading: productsLoading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchMerchantById(id));
      dispatch(fetchProductsByMerchant(id));
    }
  }, [id, dispatch]);

  const handleAddToCart = (product) => {
    // TODO: Implement add to cart functionality
    console.log('Add to cart:', product);
    alert(`Added ${product.name} to cart! (Cart feature coming soon)`);
  };

  if (merchantLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading merchant...</div>
      </div>
    );
  }

  if (!selectedMerchant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-2">Merchant not found</p>
        </div>
      </div>
    );
  }

  const categoryColors = {
    food: 'bg-orange-100 text-orange-800',
    grocery: 'bg-green-100 text-green-800',
    pharmacy: 'bg-red-100 text-red-800',
    others: 'bg-gray-100 text-gray-800',
  };

  const categoryLabels = {
    food: 'Food',
    grocery: 'Grocery',
    pharmacy: 'Pharmacy',
    others: 'Others',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Merchant Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
              {selectedMerchant.image ? (
                <img
                  src={selectedMerchant.image}
                  alt={selectedMerchant.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="text-gray-400 text-6xl">🏪</div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {selectedMerchant.name}
                </h1>
                <span
                  className={`ml-2 px-3 py-1 text-sm font-medium rounded-full ${
                    categoryColors[selectedMerchant.category] || categoryColors.others
                  }`}
                >
                  {categoryLabels[selectedMerchant.category] || 'Others'}
                </span>
              </div>

              {selectedMerchant.description && (
                <p className="text-gray-600 mb-4">{selectedMerchant.description}</p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {selectedMerchant.rating > 0 && (
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-2">⭐</span>
                    <span className="font-medium">{selectedMerchant.rating.toFixed(1)}</span>
                  </div>
                )}
                <div>
                  <span className="text-gray-600">Delivery Time: </span>
                  <span className="font-medium">
                    {selectedMerchant.deliveryTime || '30-45 mins'}
                  </span>
                </div>
                {selectedMerchant.minimumOrder > 0 && (
                  <div>
                    <span className="text-gray-600">Minimum Order: </span>
                    <span className="font-medium">₹{selectedMerchant.minimumOrder}</span>
                  </div>
                )}
              </div>

              {selectedMerchant.address && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">📍 Address: </span>
                    {selectedMerchant.address.street && (
                      <span>{selectedMerchant.address.street}, </span>
                    )}
                    {selectedMerchant.address.city}
                    {selectedMerchant.address.state && `, ${selectedMerchant.address.state}`}
                    {selectedMerchant.address.pincode && ` - ${selectedMerchant.address.pincode}`}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Products</h2>
          <ProductList
            products={products}
            isLoading={productsLoading}
            error={error}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>
    </div>
  );
};

export default MerchantDetailPage;

