import { ShoppingBag, ClipboardList } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import PaymentSheet from "./PaymentSheet";
import PaymentOptions from "./PaymentOptions";
import OrderStatus from "./OrderStatus";
import { useState } from "react";
import { Product } from "@/services/api";

interface TopBarProps {
  cartItems: Array<{
    product: Product;
    quantity: number;
    variants?: Record<string, string>;
  }>;
  onCheckout: () => void;
  hasActiveOrder?: boolean;
}

const TopBar = ({ cartItems, onCheckout, hasActiveOrder }: TopBarProps) => {
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [showOrderStatus, setShowOrderStatus] = useState(false);
  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handlePaymentSelect = (method: string) => {
    if (method === "card") {
      setPaymentMethod("card");
    } else {
      // Simulamos el pago con otros métodos
      onCheckout();
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bg-white border-b z-50">
        <div className="max-w-screen-xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="font-heading font-bold">Click to Drink</h1>
          
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingBag className="h-5 w-5" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle>Tu pedido</SheetTitle>
                </SheetHeader>
                {showPayment ? (
                  paymentMethod === "card" ? (
                    <PaymentSheet 
                      total={total} 
                      onBack={() => setPaymentMethod(null)}
                      onSuccess={onCheckout}
                    />
                  ) : (
                    <PaymentOptions
                      total={total}
                      onSelectPayment={handlePaymentSelect}
                      onBack={() => setShowPayment(false)}
                    />
                  )
                ) : (
                  <div className="flex flex-col h-full">
                    <div className="flex-1 overflow-auto py-6">
                      {cartItems.map((item) => (
                        <div key={item.product.id} className="flex items-center gap-4 mb-4">
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
                    <Separator />
                    <div className="py-4">
                      <div className="flex justify-between mb-4">
                        <span className="font-medium">Total</span>
                        <span className="font-medium">{total.toFixed(2)}€</span>
                      </div>
                      <Button
                        className="w-full"
                        onClick={() => setShowPayment(true)}
                        disabled={cartItems.length === 0}
                      >
                        Pagar {total.toFixed(2)}€
                      </Button>
                    </div>
                  </div>
                )}
              </SheetContent>
            </Sheet>

            {hasActiveOrder && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowOrderStatus(true)}
              >
                <ClipboardList className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </div>

      <OrderStatus
        open={showOrderStatus}
        onClose={() => setShowOrderStatus(false)}
        items={cartItems}
      />
    </>
  );
};

export default TopBar;