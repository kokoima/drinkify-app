import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Product } from '@/services/api';

interface ProductTabsProps {
  products: Product[];
  onCategoryChange: (category: string) => void;
}

const ProductTabs = ({ products, onCategoryChange }: ProductTabsProps) => {
  const [activeCategory, setActiveCategory] = useState<string>(() => {
    const categories = [...new Set(products.map(p => p.category))];
    return categories[0] || '';
  });

  const categories = [...new Set(products.map(p => p.category))];

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    onCategoryChange(category);
  };

  return (
    <div className="border-b border-gray-200 overflow-x-auto">
      <div className="flex space-x-2 p-2 min-w-full">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors",
              activeCategory === category
                ? "bg-primary text-white"
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductTabs;