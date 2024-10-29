import { useState } from 'react';
import { X } from 'lucide-react';
import { ProductVariant } from '@/services/api';

interface VariantModalProps {
  variants: ProductVariant[];
  onClose: () => void;
  onConfirm: (selectedVariants: Record<string, string>) => void;
}

const VariantModal = ({ variants, onClose, onConfirm }: VariantModalProps) => {
  const [selections, setSelections] = useState<Record<string, string>>({});

  const handleSelect = (variantName: string, option: string) => {
    setSelections(prev => ({
      ...prev,
      [variantName]: option
    }));
  };

  const handleConfirm = () => {
    if (Object.keys(selections).length === variants.length) {
      onConfirm(selections);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end justify-center sm:items-center p-4 z-50">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-md">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="font-heading font-semibold text-lg">Personalizar</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {variants.map((variant) => (
            <div key={variant.name}>
              <h4 className="font-medium mb-2">{variant.name}</h4>
              <div className="grid grid-cols-2 gap-2">
                {variant.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSelect(variant.name, option)}
                    className={`p-3 rounded-lg border text-sm transition-colors ${
                      selections[variant.name] === option
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t">
          <button
            onClick={handleConfirm}
            disabled={Object.keys(selections).length !== variants.length}
            className="w-full py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default VariantModal;