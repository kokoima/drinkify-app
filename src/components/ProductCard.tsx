import { Plus, Minus } from 'lucide-react';
import { Product } from '@/services/api';
import { useState } from 'react';
import ProductDetail from './ProductDetail';

interface ProductCardProps {
  product: Product;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
}

const ProductCard = ({ product, quantity, onAdd, onRemove }: ProductCardProps) => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg overflow-hidden card-shadow">
        <div 
          className="aspect-video relative cursor-pointer"
          onClick={() => setShowDetail(true)}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:opacity-90 transition-opacity"
          />
          <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-sm font-medium">
            {product.price.toFixed(2)}€
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-heading font-semibold text-lg">{product.name}</h3>
          <p className="text-gray-600 text-sm mt-1">{product.description}</p>
          
          <div className="mt-4 flex items-center justify-between">
            {quantity > 0 ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={onRemove}
                  className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="font-medium">{quantity}</span>
                <button
                  onClick={onAdd}
                  className="p-1 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onAdd}
                className="p-1 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            )}
            
            {product.variants && (
              <span className="text-sm text-gray-500">
                {product.variants.length} opciones
              </span>
            )}
          </div>
        </div>
      </div>

      <ProductDetail
        product={product}
        quantity={quantity}
        onAdd={onAdd}
        onRemove={onRemove}
        open={showDetail}
        onClose={() => setShowDetail(false)}
      />
    </>
  );
};

export default ProductCard;