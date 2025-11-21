import React from 'react';
import Button from '../../common/Button/Button';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      <div className="h-40 bg-gray-200 flex items-center justify-center">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-gray-400 text-3xl">📦</div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
            {product.description}
          </p>
        )}
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-xl font-bold text-blue-600">
              ₹{product.price.toFixed(2)}
            </span>
            {product.unit && (
              <span className="text-sm text-gray-500 ml-1">/ {product.unit}</span>
            )}
          </div>
          {product.stock !== undefined && (
            <span
              className={`text-xs px-2 py-1 rounded ${
                product.stock > 0
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
            </span>
          )}
        </div>
        <Button
          variant="primary"
          size="sm"
          className="w-full"
          disabled={!product.isAvailable || (product.stock !== undefined && product.stock === 0)}
          onClick={() => onAddToCart && onAddToCart(product)}
        >
          {!product.isAvailable || (product.stock !== undefined && product.stock === 0)
            ? 'Not Available'
            : 'Add to Cart'}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;

