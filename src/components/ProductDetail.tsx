import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Product } from "@/services/api";
import { Plus, Minus, Info } from "lucide-react";

interface ProductDetailProps {
  product: Product;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
  open: boolean;
  onClose: () => void;
}

const ProductDetail = ({
  product,
  quantity,
  onAdd,
  onRemove,
  open,
  onClose,
}: ProductDetailProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        <div className="relative h-64 sm:h-96">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-sm font-medium">
            {product.price.toFixed(2)}€
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h2 className="text-2xl font-heading font-semibold">{product.name}</h2>
              <p className="text-gray-600 mt-1">{product.description}</p>
            </div>
          </div>

          {product.variants && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Info className="h-4 w-4" />
                <span className="text-sm">
                  {product.variants.length} opciones disponibles
                </span>
              </div>
              {product.variants.map((variant) => (
                <div key={variant.name} className="space-y-2">
                  <h3 className="font-medium">{variant.name}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {variant.options.map((option) => (
                      <button
                        key={option}
                        className="p-3 rounded-lg border border-gray-200 text-sm hover:border-gray-300 transition-colors"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t">
            {quantity > 0 ? (
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onRemove}
                  className="h-8 w-8"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="font-medium text-lg">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onAdd}
                  className="h-8 w-8"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button onClick={onAdd} className="w-full">
                Añadir al pedido
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetail;