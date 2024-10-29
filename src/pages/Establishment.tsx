import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import api, { Product } from '@/services/api';
import ImageCarousel from '@/components/ImageCarousel';
import ProductTabs from '@/components/ProductTabs';
import ProductCard from '@/components/ProductCard';
import TopBar from '@/components/TopBar';
import VariantModal from '@/components/VariantModal';

interface CartItem {
  product: Product;
  quantity: number;
  variants?: Record<string, string>;
}

const Establishment = () => {
  const { establishmentId = '', zoneId = '' } = useParams();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [variantProduct, setVariantProduct] = useState<Product | null>(null);
  const [hasActiveOrder, setHasActiveOrder] = useState(false);

  const { data: establishment } = useQuery({
    queryKey: ['establishment', establishmentId],
    queryFn: () => api.getEstablishment(establishmentId),
  });

  const { data: products = [] } = useQuery({
    queryKey: ['products', establishmentId],
    queryFn: () => api.getProducts(establishmentId),
  });

  const filteredProducts = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : products;

  const handleAddProduct = (product: Product) => {
    if (product.variants) {
      setVariantProduct(product);
      return;
    }

    setCartItems(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleRemoveProduct = (productId: string) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.product.id === productId);
      if (existingItem?.quantity === 1) {
        return prev.filter(item => item.product.id !== productId);
      }
      return prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  };

  const handleVariantConfirm = (variants: Record<string, string>) => {
    if (!variantProduct) return;

    setCartItems(prev => {
      const existingItem = prev.find(
        item => 
          item.product.id === variantProduct.id && 
          JSON.stringify(item.variants) === JSON.stringify(variants)
      );

      if (existingItem) {
        return prev.map(item =>
          item === existingItem
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { product: variantProduct, quantity: 1, variants }];
    });
  };

  const handleCheckout = () => {
    setCartItems([]);
    setHasActiveOrder(true);
  };

  if (!establishment) return null;

  return (
    <div className="min-h-screen pb-32">
      <TopBar 
        cartItems={cartItems}
        onCheckout={handleCheckout}
        hasActiveOrder={hasActiveOrder}
      />
      
      <div className="pt-16">
        <ImageCarousel images={establishment.images} />
        
        <div className="px-4 py-6">
          <h1 className="font-heading font-bold text-2xl">{establishment.name}</h1>
          <p className="text-gray-600 mt-1">{establishment.description}</p>
        </div>

        <ProductTabs
          products={products}
          onCategoryChange={setSelectedCategory}
        />

        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              quantity={
                cartItems
                  .filter(item => item.product.id === product.id)
                  .reduce((sum, item) => sum + item.quantity, 0)
              }
              onAdd={() => handleAddProduct(product)}
              onRemove={() => handleRemoveProduct(product.id)}
            />
          ))}
        </div>

        {variantProduct && (
          <VariantModal
            variants={variantProduct.variants || []}
            onClose={() => setVariantProduct(null)}
            onConfirm={handleVariantConfirm}
          />
        )}
      </div>
    </div>
  );
};

export default Establishment;