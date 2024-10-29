import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Product } from "@/services/api";
import { ClipboardList, Clock } from "lucide-react";

interface OrderStatusProps {
  open: boolean;
  onClose: () => void;
  items: Array<{
    product: Product;
    quantity: number;
    variants?: Record<string, string>;
  }>;
}

const OrderStatus = ({ open, onClose, items }: OrderStatusProps) => {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5" />
            Estado del pedido
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6">
          <div className="flex items-center gap-2 text-amber-600 mb-4">
            <Clock className="h-5 w-5" />
            <span>Preparando tu pedido</span>
          </div>

          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.product.id} className="flex items-center gap-4">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.product.name}</h3>
                  <p className="text-sm text-gray-500">
                    Cantidad: {item.quantity}
                  </p>
                  {item.variants && (
                    <p className="text-sm text-gray-500">
                      {Object.entries(item.variants)
                        .map(([key, value]) => `${key}: ${value}`)
                        .join(", ")}
                    </p>
                  )}
                </div>
                <p className="font-medium">
                  {(item.product.price * item.quantity).toFixed(2)}€
                </p>
              </div>
            ))}
          </div>

          <Separator className="my-4" />
          
          <div className="flex justify-between items-center font-medium">
            <span>Total</span>
            <span>{total.toFixed(2)}€</span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default OrderStatus;